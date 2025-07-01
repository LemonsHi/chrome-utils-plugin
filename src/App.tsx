import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { tools } from './tools';

import Home from './pages/Home';
import WorkContainer from './pages/Work';

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
      <BrowserRouter basename="/sidepanel.html">
        <Routes>
          <Route path="/" element={<Home />} />
          {tools.map((tool) => (
            <Route
              path={`/tool/${tool.key}`}
              element={<WorkContainer pageModule={tool.key} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
