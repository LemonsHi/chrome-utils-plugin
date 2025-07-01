import { FormatOptions } from '~/types/url-formate';

export const formatUrl = (urlStr: string, opts: FormatOptions): URL | null => {
  try {
    const url = new URL(urlStr.trim());

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
