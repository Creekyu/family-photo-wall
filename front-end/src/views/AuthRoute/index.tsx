import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import LoginPage from '@/views/LoginPage';
import { useAppSelector } from '@/redux';
import Cookies from 'universal-cookie';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

const getPath = (pathList: string[], user: any, children: any, msg: any) => {
  if (
    pathList.includes('user') &&
    (user.role === 'root' || user.role === 'admin')
  )
    return children;
  else if (
    (pathList.includes('oss') || pathList.includes('smtp')) &&
    user.role === 'root'
  )
    return children;
  else if (pathList.includes('add') || pathList.includes('edit'))
    return children;
  else {
    msg.error('没有权限进行此操作！');
    return <Navigate to="" replace={true} />;
  }
};

const AuthRoute = () => {
  const msg = useGlobalMessage();
  const navigate = useNavigate();
  const location = useLocation();

  // login state
  const isLogin = useAppSelector((state) => state.universal.isLogin);

  // cookie
  const cookies = new Cookies();
  const user = cookies.get('user');

  useEffect(() => {
    const pathList = location.pathname.split('/');
    if (!isLogin) navigate('/manage');
    if (pathList.includes('/manage')) {
      if (
        pathList.includes('user') &&
        user.role !== 'root' &&
        user.role === 'admin'
      ) {
        console.log('test1');
        msg.error('没有权限进行此操作！');
        navigate(0);
      } else if (
        (pathList.includes('oss') || pathList.includes('smtp')) &&
        user.role !== 'root'
      ) {
        console.log('test2');
        msg.error('没有权限进行此操作！');
        navigate(0);
      }
    }
  }, [location]);

  return <Outlet />;
};

export default AuthRoute;
