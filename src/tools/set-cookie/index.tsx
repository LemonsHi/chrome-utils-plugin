import { FC, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  Space,
  Typography,
  message,
  Card,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { setChromeCookie } from './chromeApi';
import { parseCookieString } from './utils';

import { CookiePair } from '~/types/set-cookie';
import { ComponentProps } from '~/types/tooles';

const SetCookie: FC<ComponentProps> = ({ navigate }) => {
  const [form] = Form.useForm<{ cookieStr: string }>();
  const [parsed, setParsed] = useState<CookiePair[]>([]);
  const [loadingSet, setLoadingSet] = useState(false);

  const columns: ColumnsType<CookiePair> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      render: (text) => (
        <Typography.Text copyable ellipsis={{ tooltip: text }}>
          {text}
        </Typography.Text>
      ),
    },
  ];

  /**
   * 点击【解析】
   */
  const handleParse = () => {
    const raw = form.getFieldValue('cookieStr')?.trim();
    if (!raw) {
      message.warning('请先输入 Cookie 字符串');
      return;
    }
    const list = parseCookieString(raw);
    if (list.length === 0) {
      message.error('未解析到任何 Cookie');
      return;
    }
    setParsed(list);
    message.success(`已解析 ${list.length} 条 Cookie`);
  };

  /**
   * 将解析后的 Cookie 写入当前活动标签页
   */
  const handleSetCookies = () => {
    if (parsed.length === 0) return;

    setLoadingSet(true);
    setChromeCookie({ parsed, setLoadingSet });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {/* 标题 */}
      <Typography.Title level={4} style={{ margin: 0 }}>
        <ArrowLeftOutlined
          style={{ marginRight: 8 }}
          onClick={() => navigate('/')}
        />
        Cookie 设置
      </Typography.Title>

      {/* 输入区 & 操作按钮 */}
      <Card>
        <Form form={form} layout="vertical" initialValues={{ cookieStr: '' }}>
          <Form.Item
            label="Cookie 字符串"
            name="cookieStr"
            rules={[{ required: true, message: '请输入 Cookie 字符串' }]}
          >
            <Input.TextArea
              placeholder="粘贴 Cookie，如 name1=value1; name2=value2 ..."
              autoSize={{ minRows: 4, maxRows: 10 }}
              showCount
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={handleParse}>解析</Button>
              <Button
                type="primary"
                disabled={parsed.length === 0}
                loading={loadingSet}
                onClick={handleSetCookies}
              >
                Set Cookies
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 预览表格 */}
      {parsed.length > 0 && (
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={parsed}
          pagination={false}
        />
      )}
    </Space>
  );
};

export default SetCookie;
