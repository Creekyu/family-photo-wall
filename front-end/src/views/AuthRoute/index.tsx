import React from 'react';
import { useLocation } from 'react-router';
import LoginPage from '@/views/LoginPage';
import { useAppSelector } from '@/redux';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const isLogin = useAppSelector((state) => state.backstage.isLogin);
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      {path.match(/(\/manage)/) ? (
        isLogin ? (
          children
        ) : (
          <LoginPage></LoginPage>
        )
      ) : (
        children
      )}
    </>
  );
};

export default AuthRoute;
