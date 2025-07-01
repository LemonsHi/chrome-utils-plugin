import { CookiePair } from '~/types/set-cookie';

export const parseCookieString = (raw: string): CookiePair[] => {
  return raw
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, idx) => {
      const eqIndex = part.indexOf('=');
      const name = eqIndex === -1 ? part : part.slice(0, eqIndex);
      const value = eqIndex === -1 ? '' : part.slice(eqIndex + 1);
      return { key: `${idx}`, name, value };
    });
};
