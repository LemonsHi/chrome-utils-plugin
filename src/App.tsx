import { FC } from 'react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { tools } from './tools';

import Home from './pages/Home';
import WorkContainer from './pages/Work';

const App: FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter basename="/sidepanel.html">
        <Routes>
          <Route path="/" element={<Home />} />
          {tools.map(tool => (
            <Route
              key={tool.key}
              path={`/tool/${tool.key}`}
              element={<WorkContainer pageModule={tool.key} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
