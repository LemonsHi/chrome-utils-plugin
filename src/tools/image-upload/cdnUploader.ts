import { ProgressCB } from '~/types/image-upload';

const DEFAULT_KEY = '2739ae644d8e7223ebd06f62e1036ac7';
const DEFAULT_EXPIRATION = 6000;

/**
 * 通过XMLHttpRequest执行文件上传，并支持进度跟踪
 *
 * @param {string} url 文件上传的目标服务器地址
 * @param {FormData} body 包含文件和其他数据的FormData对象
 * @param {ProgressCB} onProgress 进度回调函数，用于接收上传进度百分比
 * @returns {Promise<string>} 返回一个Promise，解析为服务器响应的字符串
 */
const xhrUpload = (url: string, body: FormData, onProgress: ProgressCB): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () =>
      xhr.status === 200 ? resolve(xhr.response as string) : reject(xhr.response);
    xhr.onerror = reject;
    xhr.send(body);
  });
};

/**
 * 将图片文件上传到ImgBB服务并返回图片的URL地址
 *
 * @param {File} file 要上传的图片文件对象
 * @param {ProgressCB} onProgress 上传进度回调函数，用于实时更新上传进度
 * @returns {Promise<string>} 返回上传成功后的图片URL地址
 */
export const commonUpload = async (file: File, onProgress: ProgressCB): Promise<string> => {
  const fd = new FormData();
  fd.append('image', file);
  const responseStr = await xhrUpload(
    `https://api.imgbb.com/1/upload?expiration=${DEFAULT_EXPIRATION}&key=${DEFAULT_KEY}`,
    fd,
    onProgress
  );
  const response = JSON.parse(responseStr);

  return (response?.data?.display_url || '') as string;
};
