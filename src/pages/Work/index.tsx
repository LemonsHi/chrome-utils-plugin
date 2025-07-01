import { FC, useState } from 'react';
import { Layout, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

import { tools } from '~/tools';

const { Content } = Layout;

interface Props {
  pageModule: string;
}

const WorkContainer: FC<Props> = ({ pageModule }) => {
  const [currentTool, setCurrentTool] = useState<string>(pageModule);
  const navigate = useNavigate();

  const renderTool = () => {
    const currentToolInfo = tools.find((tool) => tool.key === currentTool);
    debugger;
    return (
      currentToolInfo?.element?.({ navigate }) || (
        <Empty description="此功能暂不支持，待开发～" />
      )
    );
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout>
        <Content style={{ padding: 24, overflow: 'auto' }}>
          {renderTool()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default WorkContainer;
