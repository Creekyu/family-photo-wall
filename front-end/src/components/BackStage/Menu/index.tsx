import React from 'react';
import { useNavigate } from 'react-router';

// antd
import {
  EditOutlined,
  PlusSquareOutlined,
  StarOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  FolderOutlined,
  CloudDownloadOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

// redux
import { useAppSelector } from '@/redux';

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
  getItem('添加照片', 'add', <PlusSquareOutlined />),
  getItem('编辑照片', 'edit', <EditOutlined />, [
    getItem('即时上传', 'now', <PushpinOutlined />),
    getItem('大事记', 'bigEvent', <StarOutlined />),
    getItem('往事回忆', 'memory', <FieldTimeOutlined />),
    getItem('其他', 'others', <FolderOutlined />),
  ]),
  getItem('用户管理', 'user', <UserOutlined />),
  getItem('OSS设置', 'oss', <CloudDownloadOutlined />),
  getItem('SMTP设置', 'smtp', <MailOutlined />),
];

const BackStageMenu = () => {
  const navigate = useNavigate();
  const selectedKey = useAppSelector((state) => state.universal.selectedKey);
  return (
    <Menu
      theme="dark"
      defaultOpenKeys={['edit']}
      selectedKeys={[selectedKey]}
      mode="inline"
      items={items}
      onClick={(e) => {
        if (['now', 'bigEvent', 'memory', 'others'].includes(e.key))
          navigate(`/manage/edit`, { state: e.key });
        else navigate(`/manage/${e.key}`);
      }}
    />
  );
};

export default BackStageMenu;
