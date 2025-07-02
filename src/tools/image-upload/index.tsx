import { useState, useCallback, useEffect, FC } from 'react';
import {
  Upload,
  Progress,
  List,
  Select,
  Typography,
  Space,
  Button,
  message,
} from 'antd';
import {
  InboxOutlined,
  CheckCircleFilled,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import copy from 'copy-to-clipboard';
import { commonUpload } from './cdnUploader';

import { ProgressCB, Row } from '~/types/image-upload';
import { ComponentProps } from '~/types/tooles';

const { Dragger } = Upload;
const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

const CDN_OPTIONS = [{ label: 'ImgBB', value: 'imgbb' }];

const ImgUploadPage: FC<ComponentProps> = ({ navigate }) => {
  const [cdn, setCdn] = useState<string>('imgbb');
  const [rows, setRows] = useState<Row[]>([]);

  /**
   * 更新指定行数据的回调函数
   *
   * 该函数使用useCallback进行记忆化，避免不必要的重渲染
   *
   * @param {string} uid - 需要更新的行的唯一标识符
   * @param {Partial<Row>} data - 包含需要更新的字段和值的对象，使用Partial类型表示可以只更新Row的部分属性
   * @returns {void}
   */
  const patch = useCallback((uid: string, data: Partial<Row>) => {
    setRows((prev) => prev.map((r) => (r.uid === uid ? { ...r, ...data } : r)));
  }, []);

  /**
   * 启动文件上传流程，处理上传进度、成功和失败状态
   *
   * @param {File} file 要上传的文件对象
   * @param {string} uid 与上传文件关联的唯一标识符
   * @returns {Promise<void>} 上传操作的异步结果
   */
  const startUpload = async (file: File, uid: string) => {
    const tick: ProgressCB = (p) => patch(uid, { percent: p });
    try {
      const url = await commonUpload(file, tick);
      patch(uid, { url, percent: 100, status: 'done' });
      message.success('上传成功，外链已复制到剪贴板');
    } catch (err) {
      console.error(err);
      patch(uid, { status: 'error' });
      message.error('上传失败');
    }
  };

  /**
   * 处理文件上传前的验证逻辑，检查文件类型和大小，并初始化上传流程
   *
   * @param {File} file 用户选择的待上传文件
   * @returns {boolean|string} 返回Upload.LIST_IGNORE表示拒绝上传，返回false表示阻止默认上传行为
   */
  const handleBefore = (file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('仅支持图片文件');
      return Upload.LIST_IGNORE;
    }
    if (file.size > MAX_SIZE) {
      message.error('仅支持 ≤ 20 MB 的图片');
      return Upload.LIST_IGNORE;
    }
    const uid = uuid();
    setRows((prev) => [
      ...prev,
      {
        uid,
        name: file.name,
        size: file.size,
        percent: 0,
        status: 'uploading',
      },
    ]);
    startUpload(file, uid);
    return false; // 阻止 antd 默认上传
  };

  /**
   * 监听全局粘贴事件，实现剪贴板图片直接上传功能
   *
   * 该副作用在组件挂载时设置粘贴事件监听器，并在组件卸载时移除监听器
   * 以防止内存泄漏和重复监听
   */
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const file = Array.from(e.clipboardData?.files ?? [])[0];
      if (file) handleBefore(file);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 标题 */}
      <Typography.Title level={4} style={{ margin: 0, marginBottom: 16 }}>
        <ArrowLeftOutlined
          style={{ marginRight: 8 }}
          onClick={() => navigate('/')}
        />
        图片上传
      </Typography.Title>
      <Space style={{ marginBottom: 16 }}>
        <span>CDN：</span>
        <Select
          style={{ width: 160 }}
          value={cdn}
          options={CDN_OPTIONS}
          onChange={(v) => setCdn(v)}
        />
      </Space>

      <Dragger
        accept="image/*"
        multiple
        beforeUpload={handleBefore}
        showUploadList={false}
        style={{ borderRadius: 8 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">将图片拖到此处，或点击选择文件</p>
        <p className="ant-upload-hint">支持粘贴截图（⌘/Ctrl + V）</p>
      </Dragger>

      <List
        dataSource={rows}
        renderItem={(r) => (
          <List.Item
            actions={
              r.url
                ? [
                    <Button
                      size="small"
                      type="link"
                      onClick={() => {
                        copy(r.url!);
                        message.success('已复制');
                      }}
                    >
                      复制
                    </Button>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              title={
                <Space>
                  <Typography.Text>{r.name}</Typography.Text>
                  {r.status === 'done' && (
                    <CheckCircleFilled style={{ color: '#52c41a' }} />
                  )}
                </Space>
              }
              description={`${(r.size / 1024).toFixed(1)} KB`}
            />
            <div style={{ width: 150 }}>
              <Progress
                percent={r.percent}
                status={
                  r.status === 'error'
                    ? 'exception'
                    : r.status === 'done'
                    ? 'success'
                    : 'active'
                }
                showInfo={false}
                strokeWidth={6}
              />
            </div>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default ImgUploadPage;
