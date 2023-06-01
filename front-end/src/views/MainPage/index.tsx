import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

// comp
import TopHeader from '@/components/TopHeader';

// redux
import { generateRandList } from '@/redux/slice/universal';
import { useAppDispatch } from '@/redux';

const MainPage = () => {
  const dispatch = useAppDispatch();
  // 生成HomePage要用到的随机数列表
  useEffect(() => {
    dispatch(generateRandList());
  }, []);
  return (
    <div>
      <TopHeader></TopHeader>
      <Outlet></Outlet>
    </div>
  );
};

export default MainPage;
