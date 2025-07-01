import React, { useState } from 'react';
import { Layout, Input, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header';
import CardContent from './components/CardContent';

import { tools } from '../../tools';

const Home: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { token } = theme.useToken();

  // 关键词过滤：支持标题、key 模糊匹配（忽略大小写）
  const list = tools.filter(({ title, key }) => {
    const kw = keyword.toLowerCase();
    return title.toLowerCase().includes(kw) || key.toLowerCase().includes(kw);
  });

  return (
    <Layout
      style={{ height: '100vh', padding: 16, background: token.colorBgLayout }}
    >
      {/* Header */}
      <Header navigate={navigate} />

      {/* Search */}
      <Input.Search
        placeholder="搜索工具 (URL / JSON …)"
        allowClear
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={() => {
          if (list.length) navigate(list[0].route);
        }}
        style={{ marginBottom: 16 }}
      />

      {/* Tool Grid */}
      <CardContent navigate={navigate} list={list} />
    </Layout>
  );
};

export default Home;
