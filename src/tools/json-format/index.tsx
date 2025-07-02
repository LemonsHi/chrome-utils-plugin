import { useState, useRef, useCallback, FC } from 'react';
import { Button, Space, Alert, message, Typography, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import debounce from 'lodash/debounce';

import JsonView from 'react18-json-view';

import { ToolProps } from '~/types/tooles';

import 'react18-json-view/src/style.css';

/**
 * 组件状态声明
 *
 * @type {[string, Function]} code - 存储JSON字符串及其更新函数，初始值为空对象
 * @type {[Object, Function]} jsonObj - 存储解析后的JSON对象及其更新函数
 * @type {[string|null, Function]} error - 存储解析错误信息及其更新函数
 * @type {[boolean|number, Function]} collapsed - 控制JSON树视图的折叠状态及其更新函数，2表示默认展开两层
 */
const JsonFormatter: FC<ToolProps> = ({ navigate }) => {
  const [code, setCode] = useState<string>('{}\n');
  const [jsonObj, setJsonObj] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<boolean | number>(2);

  const editorRef = useRef<any>(null);

  /** 尝试解析 JSON */
  const tryParse = useCallback((value: string) => {
    try {
      const obj = JSON.parse(value);
      setJsonObj(obj);
      setError(null);
    } catch (e: any) {
      setError(e.message as string);
    }
  }, []);

  /** 编辑器内容变化（防抖） */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onCodeChange = useCallback(
    debounce((value?: string) => {
      const v = value ?? '';
      setCode(v);
      tryParse(v);
    }, 300),
    []
  );

  /**
   * 格式化JSON字符串，将其转换为美观的缩进格式并更新相关状态。
   *
   * @returns {void} 无返回值，操作结果通过状态更新和消息提示展示
   */
  const handleFormat = useCallback(() => {
    try {
      const obj = JSON.parse(code);
      const pretty = JSON.stringify(obj, null, 2);
      setCode(pretty);
      editorRef.current?.setValue(pretty);
      setJsonObj(obj);
      setError(null);
      message.success('已格式化 JSON');
    } catch (e: any) {
      setError(e.message as string);
    }
  }, [code]);

  /**
   * 从树形结构同步更新JSON数据，并更新编辑器内容和相关状态。
   *
   * @param {any} e 包含更新后源数据的事件对象
   * @returns {void} 无返回值
   */
  const syncFromTree = useCallback((e: any) => {
    const updated = e.updated_src;
    const pretty = JSON.stringify(updated, null, 2);
    setJsonObj(updated);
    setCode(pretty);
    editorRef.current?.setValue(pretty);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 标题 */}
      <Typography.Title level={4} style={{ margin: 0, marginBottom: 16 }}>
        <ArrowLeftOutlined style={{ marginRight: 8 }} onClick={() => navigate('/')} />
        JSON 格式化
      </Typography.Title>

      {/* 顶部按钮栏 */}
      <Space style={{ marginBottom: 8 }}>
        <Button type="primary" onClick={handleFormat}>
          格式化
        </Button>
        <Button onClick={() => setCollapsed(true)}>折叠全部</Button>
        <Button onClick={() => setCollapsed(false)}>展开全部</Button>
      </Space>

      {/* 错误提示 */}
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 8 }} />}

      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          gap: 16,
          flexDirection: 'column',
        }}
      >
        {/* Monaco 编辑器 */}
        <Card style={{ flex: 1, minWidth: 0, minHeight: 0 }} bodyStyle={{ height: '100%' }}>
          <Editor
            height="100%" // 关键：随容器高度自适应
            defaultLanguage="json"
            value={code}
            onMount={editor => (editorRef.current = editor)}
            onChange={onCodeChange}
            options={{
              minimap: { enabled: false },
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              tabSize: 2,
              automaticLayout: true,
            }}
          />
        </Card>

        {/* JSON Tree 视图 */}
        <Card style={{ flex: 1, minWidth: 0 }} bodyStyle={{ overflow: 'auto' }}>
          <JsonView
            src={jsonObj}
            collapsed={collapsed}
            enableClipboard
            onEdit={syncFromTree}
            onAdd={syncFromTree}
            onDelete={syncFromTree}
            style={{ background: 'transparent' }}
          />
        </Card>
      </div>
    </div>
  );
};

export default JsonFormatter;
