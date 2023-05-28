import React from 'react';

// antd
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

// css
import style from './index.module.scss';

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('添加照片', 'add', <PieChartOutlined />),
  getItem('删除照片', '2', <DesktopOutlined />),
];

const BackStageMenu = () => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  );
};

export default BackStageMenu;
