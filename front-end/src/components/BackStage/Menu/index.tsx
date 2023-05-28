import React from 'react';
import { useNavigate } from 'react-router';

// antd
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

// css
import style from './index.module.scss';

// redux
import { useAppDispatch, useAppSelector } from '@/redux';
import { setSelectedKey } from '@/redux/slice/backstage';

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

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  getItem('添加照片', 'add', <PieChartOutlined />),
  getItem('删除照片', 'edit', <DesktopOutlined />),
];

const BackStageMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedKey = useAppSelector((state) => state.backstage.selectedKey);
  return (
    <Menu
      theme="dark"
      selectedKeys={[selectedKey]}
      mode="inline"
      items={items}
      onClick={(e) => {
        dispatch(setSelectedKey(e.key));
        navigate(`/manage/${e.key}`);
      }}
    />
  );
};

export default BackStageMenu;
