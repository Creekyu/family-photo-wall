import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

// comp
import TopHeader from '@/components/TopHeader';
import Footer from '@/components/Footer';

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
    <>
      <div className="clearfix" style={{ minHeight: '100vh' }}>
        <TopHeader></TopHeader>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainPage;
