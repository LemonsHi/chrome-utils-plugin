import { FC } from 'react';
import { Card, Col, Layout, Row } from 'antd';
import { NavigateFunction } from 'react-router-dom';

import { ToolMeta } from '~/types/tooles';

interface Props {
  navigate: NavigateFunction;
  list: ToolMeta[];
}

const { Content } = Layout;

const CardContent: FC<Props> = ({ list, navigate }) => {
  return (
    <Content>
      <Row gutter={[16, 16]}>
        {list.map((t) => (
          <Col span={12} key={t.key}>
            <Card
              hoverable
              className="tool-card"
              style={{ textAlign: 'center', borderRadius: 12 }}
              onClick={() => navigate(t.route)}
            >
              {t.icon}
              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 500 }}>
                {t.title}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Content>
  );
};

export default CardContent;
