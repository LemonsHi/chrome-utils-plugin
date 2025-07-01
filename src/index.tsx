import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Layout } from 'antd';
import 'antd/dist/reset.css'; // AntD v5 样式入口
import './index.less';

const App = () => (
  <Layout style={{ padding: 16 }}>
    <h2>🧩 Hello SidePanel</h2>
    <Button type="primary">AntD Button</Button>
  </Layout>
);

createRoot(document.getElementById('root')!).render(<App />);
