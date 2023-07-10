import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

// antd
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CodepenOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

// css
import style from './index.module.scss';

// comp
import BackStageMenu from '@/components/BackStage/Menu';

// context
import { useGlobalModal } from '@/components/ContextProvider/ModalProvider';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';
import { useViewport } from '@/components/ContextProvider/ViewportProvider';

// redux
import { setIsLogin } from '@/redux/slice/universal';
import { useAppDispatch } from '@/redux';

// global
import { BREAK_POINT } from '@/global';

const BackStage: React.FC = () => {
  const { width } = useViewport();
  const [collapsed, setCollapsed] = useState(width <= BREAK_POINT);
  const dispatch = useAppDispatch();
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
        dispatch(setIsLogin(false));
        navigate('/manage');
      },
    });
  };
  return (
    <Layout className={style.wrapper}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="15vw"
        theme="light"
      >
        <div className={style.logo}>
          <CodepenOutlined />
          Manage
        </div>
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
          <Link to="/" className={style.back}>
            返回主界面
          </Link>
          <div className={style.logOut} onClick={handleLogout}>
            Log out
          </div>
        </Header>
        <Content
          className={style.content}
          style={{
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BackStage;
