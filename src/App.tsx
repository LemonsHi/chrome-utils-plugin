import React from 'react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // 中文化（可选）
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Settings from './pages/Settings'; // 你的其它页面

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      /** 这里就是方案 3 的关键点 **/
      theme={{
        token: {
          /** 主色想改都可以改；默认就是 #1677ff */
          colorPrimary: '#1677ff',
        },
        /** 若想暗色模式时自动改变量，把 algorithm 换成 theme.darkAlgorithm */
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* 继续添加你的其它工具路由 */}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
