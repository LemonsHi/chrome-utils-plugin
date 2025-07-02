import { useState, useEffect, FC } from 'react';
import { Input, Button, Space, Typography, Card } from 'antd';
import { CopyOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import QRCode from 'react-qr-code';

import { ToolProps } from '~/types/tooles';
import { copyLink, downloadPng } from './utils';

const UrlToQr: FC<ToolProps> = ({ navigate }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const callback = async () => {
      if (process.env.NODE_ENV !== 'development') {
        try {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab?.url) setUrl(tab.url);
        } catch (err) {
          console.error(err);
        }
      }
    };

    callback();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        <ArrowLeftOutlined
          onClick={() => navigate('/')}
          style={{ marginRight: 8, cursor: 'pointer' }}
        />
        二维码生成
      </Typography.Title>

      <Space.Compact block>
        <Input.TextArea
          allowClear
          placeholder="输入或粘贴要转换的链接"
          autoSize={{ minRows: 6, maxRows: 12 }}
          showCount
          value={url}
          onChange={e => setUrl(e.target.value.trim())}
        />
      </Space.Compact>

      <Space>
        <Button type="primary" icon={<CopyOutlined />} onClick={() => copyLink(url)}>
          复制
        </Button>
        <Button icon={<DownloadOutlined />} onClick={() => downloadPng()}>
          下载
        </Button>
      </Space>

      <Card style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {url ? (
          <QRCode id="qr-svg" value={url} size={220} />
        ) : (
          <Typography.Text type="secondary">请先输入链接</Typography.Text>
        )}
      </Card>
    </div>
  );
};

export default UrlToQr;
