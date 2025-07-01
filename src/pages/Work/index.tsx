import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import UrlFormatter from '~/tools/url-format';
import { tools } from '~/tools';

const { Sider, Content } = Layout;

interface Props {
  pageModule: string;
}

const WorkContainer: FC<Props> = ({ pageModule }) => {
  const navigate = useNavigate();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={72} theme="dark">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={['url']}
          inlineCollapsed
          items={tools.map((tool) => ({
            key: tool.key,
            icon: tool.minIcon,
            label: tool.label,
          }))}
        />
      </Sider>

      {/* 右侧内容区 */}
      <Layout>
        <Content style={{ padding: 24, overflow: 'auto' }}>
          <UrlFormatter navigate={navigate} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default WorkContainer;
