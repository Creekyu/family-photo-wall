import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';

// antd
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

// css
import style from './index.module.scss';

// comp
import BackStageMenu from '@/components/BackStage/Menu';

// context
import { useGlobalModal } from '@/components/ContextProvider/ModalProvider';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

const BackStage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const modal = useGlobalModal();
  const message = useGlobalMessage();
  const navigate = useNavigate();
  const handleLogout = () => {
    modal.confirm({
      title: '提示',
      content: '是否要登出？',
      onOk: async () => {
        await message.loadingAsync('登出中', '登出成功');
        const cookies = new Cookies();
        cookies.remove('user');
        cookies.remove('token');
        navigate('/manage');
      },
    });
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width="15vw">
        <div className={style.logo}>相片管理</div>
        <BackStageMenu></BackStageMenu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className={style.logOut} onClick={handleLogout}>
            Log out
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default BackStage;
