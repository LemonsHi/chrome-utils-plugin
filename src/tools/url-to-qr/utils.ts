import { message } from 'antd';

/**
 * 将指定URL复制到剪贴板并显示成功提示
 *
 * @param {string} url 要复制到剪贴板的URL字符串
 * @returns {void}
 */
export const copyLink = (url: string) => {
  if (!url) return;
  navigator.clipboard.writeText(url).then(() => message.success('已复制链接'));
};

/**
 * 将当前页面上的二维码SVG转换为PNG图片并触发下载
 *
 * 该方法将页面中的SVG二维码转换为PNG格式并自动下载到用户设备。
 * 如果页面上没有找到二维码SVG元素，则显示警告消息。
 *
 * @returns {void} 无返回值，成功时会触发文件下载
 */
export const downloadPng = () => {
  const svg = document.getElementById('qr-svg') as SVGSVGElement | null;
  if (!svg) {
    message.warning('暂无二维码可下载');
    return;
  }
  const xml = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const href = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = href;
    a.download = 'qrcode.png';
    a.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(xml)))}`;
};
