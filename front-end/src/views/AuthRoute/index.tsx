import React from 'react';
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router';
import LoginPage from '@/views/LoginPage';
import BackStage from '@/views/BackStage';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      {path === '/manage' ? (
        token ? (
          <BackStage></BackStage>
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
