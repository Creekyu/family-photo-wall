import React from 'react';
import { Outlet } from 'react-router';
import TopHeader from '@/components/TopHeader';

const MainPage = () => {
  return (
    <div>
      <TopHeader></TopHeader>
      <Outlet></Outlet>
    </div>
  );
};

export default MainPage;
