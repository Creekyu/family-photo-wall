import React from 'react';
import { Outlet } from 'react-router';

const MainPage = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default MainPage;
