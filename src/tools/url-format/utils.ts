import { FormatOptions } from '~/types/url-formate';

const QUERY_ONLY = /^\?.+/;

export const DEFAULT_HOST = '__dummy__';

export const formatUrl = (raw: string, opts: FormatOptions): URL | null => {
  try {
    const trimmed = raw.trim();
    if (!trimmed) return null;

    const needsBase =
      !/^[a-zA-Z][\w.+-]*:\/\//.test(raw) && !QUERY_ONLY.test(raw);

    // ① 纯查询串：直接丢给 URLSearchParams
    if (/^\?/.test(trimmed)) {
      const u = new URL(`http://${DEFAULT_HOST}`); // 放个基准
      u.search = trimmed;
      return u;
    }

    // ② 其余情况：有/无 base 两种走向
    const base = `http://${DEFAULT_HOST}`;
    let url: URL;
    try {
      url = new URL(trimmed, needsBase ? base : undefined);
    } catch {
      return null; // 依旧认为非法
    }

    // ③ 若用了虚拟 base，就抹掉占位信息
    if (url.hostname === DEFAULT_HOST) {
      url.hostname = url.host = '';
      url.protocol = '';
    }

    if (opts.dropHash) {
      url.hash = '';
    }

    if (opts.sort) {
      url.searchParams.sort();
    }

    if (opts.decode) {
      // decode pathname
      url.pathname = decodeURIComponent(url.pathname);
      // decode each search param value
      const decoded = new URLSearchParams();
      url.searchParams.forEach((v, k) =>
        decoded.append(k, decodeURIComponent(v))
      );
      url.search = decoded.toString() ? `?${decoded.toString()}` : '';
    }

    return url;
  } catch (_) {
    return null;
  }
};
