import ReactDOM from 'react-dom/client';
import { loader as MonacoLoader } from '@monaco-editor/react';

import App from './App';

import 'antd/dist/reset.css';
import './index.less';

if (process.env.NODE_ENV !== 'development') {
  // -----------------------------------------------------------------------------
  //  Monaco 配置：彻底禁用 CDN，改为加载扩展内的 dist/monaco/* 静态文件
  // -----------------------------------------------------------------------------
  // ① 指定 Monaco "vs" 路径（@monaco-editor/react 的 loader API）
  MonacoLoader.config({
    paths: { vs: chrome.runtime.getURL('monaco/min/vs') }, // webpack 插件会输出 dist/monaco/vs
  });

  // ② Worker 路径：返回扩展内打包好的 worker 文件，满足 worker-src 'self'
  if (typeof window !== 'undefined' && !window.MonacoEnvironment) {
    window.MonacoEnvironment = {
      createTrustedTypesPolicy: undefined,
      getWorker: (_: string, label: string) => {
        const map: Record<string, string> = {
          json: 'json.worker.js',
          css: 'css.worker.js',
          html: 'html.worker.js',
          typescript: 'ts.worker.js',
          javascript: 'ts.worker.js',
        };
        const workerPath = map[label] || 'editor.worker.js';
        return new Worker(chrome.runtime.getURL(`monaco/${workerPath}`), {
          type: 'module',
        });
      },
    } as any;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
