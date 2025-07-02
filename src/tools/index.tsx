import { LinkOutlined, CodeOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';

import UrlFormatter from './url-format';
import SetCookie from './set-cookie';
import JsonFormatter from './json-format';
import ImgUploadPage from './image-upload';

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
    element: UrlFormatter,
  },
  {
    key: 'json-format',
    title: 'JSON 格式化',
    label: 'JSON',
    route: '/tool/json-format',
    icon: <CodeOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <CodeOutlined />,
    element: JsonFormatter,
  },
  {
    key: 'set-cookie',
    title: 'Cookie 设置',
    label: 'Cookie 设置',
    route: '/tool/set-cookie',
    icon: <EditOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <EditOutlined />,
    element: SetCookie,
  },
  {
    key: 'image-upload',
    title: '图片上传',
    label: '图片上传',
    route: '/tool/image-upload',
    icon: <UploadOutlined style={DEFAULT_ICON_STYLE} />,
    minIcon: <UploadOutlined />,
    element: ImgUploadPage,
  },
];
