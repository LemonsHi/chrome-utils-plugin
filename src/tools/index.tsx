import {
  LinkOutlined,
  CodeOutlined,
  BorderOutlined,
  EditOutlined,
  FontSizeOutlined,
} from '@ant-design/icons';
import { ToolMeta } from '../types/tooles';

const DEFAULT_ICON_STYLE = { fontSize: 32, color: '#1677ff' };

export const tools: ToolMeta[] = [
  {
    key: 'url-format',
    title: 'URL 格式化',
    label: 'URL',
    route: '/tool/url-format',
    icon: <LinkOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <LinkOutlined />,
  },
  {
    key: 'json-format',
    title: 'JSON 格式化',
    label: 'JSON',
    route: '/tool/json-format',
    icon: <CodeOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <CodeOutlined />,
  },
  {
    key: 'cookie-format',
    title: 'Cookie 格式化',
    label: 'Cookie 解析',
    route: '/tool/cookie-format',
    icon: <BorderOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <BorderOutlined />,
  },
  {
    key: 'set-cookie',
    title: 'Cookie 设置',
    label: 'Cookie 设置',
    route: '/tool/set-cookie',
    icon: <EditOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <EditOutlined />,
  },
  {
    key: 'to-base64',
    title: 'Base64 编/解码',
    label: 'Base64',
    route: '/tool/to-base64',
    icon: <FontSizeOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <FontSizeOutlined />,
  },
];
