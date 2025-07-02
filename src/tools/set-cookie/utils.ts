import { CookiePair } from '~/types/set-cookie';

/**
 * 解析Cookie字符串为结构化的Cookie键值对数组。
 *
 * @param {string} raw 原始Cookie字符串，多个Cookie以分号分隔
 * @returns {CookiePair[]} 返回解析后的Cookie对象数组，每个对象包含key、name和value属性
 */
export const parseCookieString = (raw: string): CookiePair[] => {
  return raw
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .map((part, idx) => {
      const eqIndex = part.indexOf('=');
      const name = eqIndex === -1 ? part : part.slice(0, eqIndex);
      const value = eqIndex === -1 ? '' : part.slice(eqIndex + 1);
      return { key: `${idx}`, name, value };
    });
};
