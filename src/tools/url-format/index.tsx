import { FC, useState } from 'react';
import { Button, Card, Descriptions, Input, Space, Switch, Typography, message } from 'antd';
import { CopyOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { ComponentProps } from '~/types/tooles';
import { DEFAULT_HOST, formatUrl } from './utils';

/**
 * 组件状态定义
 *
 * @property {string} raw - 存储用户输入的原始URL字符串
 * @property {boolean} decoded - 控制是否对URL进行解码，默认为true
 * @property {boolean} sorted - 控制是否对URL参数进行排序，默认为true
 * @property {boolean} droppedHash - 控制是否移除URL中的哈希部分，默认为true
 * @property {URL|null} result - 存储格式化后的URL对象，初始为null
 */
const UrlFormatter: FC<ComponentProps> = ({ navigate }) => {
  const [raw, setRaw] = useState<string>('');
  const [decoded, setDecoded] = useState(true);
  const [sorted, setSorted] = useState(true);
  const [droppedHash, setDroppedHash] = useState(true);
  const [result, setResult] = useState<URL | null>(null);

  /**
   * 根据指定的格式化选项处理URL字符串并更新结果状态。
   *
   * 该函数会：
   * 1. 使用formatUrl工具函数处理原始URL
   * 2. 如果URL无效，显示错误提示
   * 3. 如果URL有效，更新结果状态
   *
   * @returns {void} 无返回值，但会更新状态并可能显示错误消息
   */
  const handleFormat = () => {
    const res = formatUrl(raw, {
      decode: decoded,
      sort: sorted,
      dropHash: droppedHash,
    });

    if (!res) {
      return message.error('请输入合法的 URL');
    }

    setResult(res);
  };

  /**
   * 将格式化后的URL复制到剪贴板并显示成功提示。
   *
   * @returns {Promise<void>} 复制操作的Promise
   */
  const handleCopyAll = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.toString());
    message.success('已复制到剪贴板');
  };

  /**
   * 清空输入框和结果显示。
   *
   * @returns {void} 无返回值，但会重置输入和结果状态
   */
  const handleClear = () => {
    setRaw('');
    setResult(null);
  };

  const configs = [
    { key: '1', label: '解码保留字符', checked: decoded, onChange: setDecoded },
    { key: '2', label: '排序查询参数', checked: sorted, onChange: setSorted },
    {
      key: '3',
      label: '去除锚点',
      checked: droppedHash,
      onChange: setDroppedHash,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 标题 */}
      <Typography.Title level={4} style={{ margin: 0 }}>
        <ArrowLeftOutlined style={{ marginRight: 8 }} onClick={() => navigate('/')} />
        URL 格式化
      </Typography.Title>

      <Card title="原始 URL">
        {/* 输入框 */}
        <Input.TextArea
          placeholder="原始 URL"
          autoSize={{ minRows: 6, maxRows: 12 }}
          showCount
          value={raw}
          onChange={e => setRaw(e.target.value)}
        />

        {/* 可选项 */}
        <Space direction="vertical" style={{ width: '100%', marginTop: 32 }}>
          {configs.map(config => (
            <Space
              key={config.key}
              align="center"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>{config.label}</span>
              <Switch checked={config.checked} onChange={config.onChange} />
            </Space>
          ))}
        </Space>

        {/* 操作按钮 */}
        <Button type="primary" block onClick={() => handleFormat()} style={{ marginTop: 32 }}>
          格式化
        </Button>
      </Card>

      {/* 结果展示 */}
      {result && (
        <Card title="构成" size="small" bordered>
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="协议">
              <Typography.Text copyable>
                {result.hostname.includes(DEFAULT_HOST) ? '(无)' : result.protocol.replace(':', '')}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="域名">
              <Typography.Text copyable>
                {result.hostname.includes(DEFAULT_HOST) ? '(无)' : result.hostname}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="路径">
              <Typography.Text copyable>{result.pathname || '/'}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="查询参数">
              {Array.from(result.searchParams.entries()).length > 0 ? (
                <Space direction="vertical">
                  {Array.from(result.searchParams.entries()).map(([k, v]) => (
                    <Typography.Text key={k} copyable>
                      {`${k}=${v}`}
                    </Typography.Text>
                  ))}
                </Space>
              ) : (
                '(无)'
              )}
            </Descriptions.Item>
          </Descriptions>

          {/* 结果操作 */}
          <Space
            style={{
              marginTop: 16,
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Button icon={<CopyOutlined />} onClick={() => handleCopyAll()}>
              复制全部
            </Button>
            <Button danger onClick={() => handleClear()}>
              清空
            </Button>
          </Space>
        </Card>
      )}
    </Space>
  );
};

export default UrlFormatter;
