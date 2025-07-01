import {
  LinkOutlined,
  CodeOutlined,
  BorderOutlined,
  EditOutlined,
  FontSizeOutlined,
} from '@ant-design/icons';
import { ToolMeta } from '../types/tooles';

export const tools: ToolMeta[] = [
  {
    key: 'url-format',
    title: 'URL 格式化',
    route: '/tool/url-formatter',
    icon: <LinkOutlined style={{ fontSize: 32 }} />,
  },
  {
    key: 'json-format',
    title: 'JSON 格式化',
    route: '/tool/json-formatter',
    icon: <CodeOutlined style={{ fontSize: 32 }} />,
  },
  {
    key: 'cookie-format',
    title: 'Cookie 格式化',
    route: '/tool/cookie-formatter',
    icon: <BorderOutlined style={{ fontSize: 32 }} />,
  },
  {
    key: 'set-cookie',
    title: 'Cookie 设置',
    route: '/tool/set-cookie',
    icon: <EditOutlined style={{ fontSize: 32 }} />,
  },
  {
    key: 'to-base64',
    title: 'Base64 编/解码',
    route: '/tool/base64',
    icon: <FontSizeOutlined style={{ fontSize: 32 }} />,
  },
];
