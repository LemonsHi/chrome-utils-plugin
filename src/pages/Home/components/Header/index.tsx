import { FC } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { NavigateFunction } from 'react-router-dom';

import LogoIcon from '../../../../assets/LogoIcon';

interface Props {
  navigate: NavigateFunction;
}

const Header: FC<Props> = ({ navigate }) => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      {/* <img
        src="/icons/32.png"
        width={24}
        height={24}
        style={{ marginRight: 8 }}
      /> */}
      <LogoIcon className="mr-2 text-primary" style={{ color: '#1677ff' }} />
      <h2 style={{ flex: 1, margin: 0, fontWeight: 600, marginLeft: 8 }}>工具集</h2>
      <SettingOutlined
        style={{ fontSize: 18, cursor: 'pointer' }}
        onClick={() => navigate('/settings')}
      />
    </header>
  );
};

export default Header;
