import { FC } from 'react';
// import { SettingOutlined } from '@ant-design/icons';
import { NavigateFunction } from 'react-router-dom';

import LogoIcon from '../../../../assets/LogoIcon';

interface Props {
  navigate: NavigateFunction;
}

const Header: FC<Props> = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <LogoIcon className="mr-2 text-primary" style={{ color: '#1677ff' }} />
      <h2 style={{ flex: 1, margin: 0, fontWeight: 600, marginLeft: 8 }}>工具集</h2>
      {/* <SettingOutlined
        style={{ fontSize: 18, cursor: 'pointer' }}
        onClick={() => navigate('/settings')}
      /> */}
    </header>
  );
};

export default Header;
