import { FC } from 'react';
import { Layout, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

import { tools } from '~/tools';

const { Content } = Layout;

interface Props {
  pageModule: string;
}

const WorkContainer: FC<Props> = ({ pageModule }) => {
  const navigate = useNavigate();

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout>
        <Content style={{ padding: 24, overflow: 'auto' }}>
          {(() => {
            const Tool = tools.find((tool) => tool.key === pageModule)?.element;
            return Tool ? (
              <Tool navigate={navigate} />
            ) : (
              <Empty description="此功能暂不支持，待开发～" />
            );
          })()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default WorkContainer;
