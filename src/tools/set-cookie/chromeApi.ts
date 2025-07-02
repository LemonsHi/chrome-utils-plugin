import { message } from 'antd';
import { SetStateAction } from 'react';

import { CookiePair } from '~/types/set-cookie';

interface ParamProps {
  setLoadingSet: (value: SetStateAction<boolean>) => void;
  parsed: CookiePair[];
}

/**
 * 在当前活动标签页中批量设置Cookie。
 *
 * @param {Object} params - 参数对象
 * @param {Array<{name: string, value: string}>} params.parsed - 要设置的Cookie数组，每项包含name和value
 * @param {Function} params.setLoadingSet - 控制加载状态的函数
 * @returns {void} 无返回值，操作结果通过消息提示展示
 */
export const setChromeCookie = ({ parsed, setLoadingSet }: ParamProps) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    /** step1: 检查标签页有效性 */
    const tab = tabs[0];
    if (!tab?.url) {
      message.error('无法获取当前标签页 URL');
      setLoadingSet(false);
      return;
    }

    /** step2: 解析当前标签页 URL */
    const urlObj = new URL(tab.url);
    const origin = `${urlObj.protocol}//${urlObj.host}`;

    /** step3: 创建 Cookie 设置任务 */
    const tasks = parsed.map(
      ({ name, value }) =>
        new Promise<void>((resolve, reject) => {
          chrome.cookies.set(
            {
              url: origin,
              name,
              value,
              domain: urlObj.hostname,
              path: '/',
            },
            () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            }
          );
        })
    );

    /** step4: 执行所有 Cookie 设置任务 */
    Promise.allSettled(tasks)
      .then(results => {
        const failed = results.filter(r => r.status === 'rejected').length;
        const success = results.length - failed;
        if (failed > 0) {
          message.warning(`写入完成，成功 ${success} 条，失败 ${failed} 条`);
        } else {
          message.success(`成功写入 ${success} 条 Cookie`);
        }
      })
      .finally(() => setLoadingSet(false));
  });
};
