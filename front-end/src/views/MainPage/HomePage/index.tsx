import React, { useEffect, useMemo } from 'react';

// css
import style from './index.module.scss';

// interface
import { cls, ClsEnum } from '@/interface/imagesApi';

// comp
import PhotoBox from '@/components/Homepage/PhotoBox';
import TopDisplay from '@/components/TopDisplay';

// img
import img from '@/assets/images/home.png';

// redux
import { useAppDispatch } from '@/redux';
import { setChosen } from '@/redux/slice/universal';

const menu = ['now', 'memory', 'bigEvent', 'others'] as cls[];
const HomePage = () => {
  const dispatch = useAppDispatch();
  const randList = useMemo(() => {
    return [] as number[];
  }, []);

  useEffect(() => {
    dispatch(setChosen(0));
  }, []);
  return (
    <div className={style.wrapper}>
      <TopDisplay img={img}></TopDisplay>
      <div className={`${style.content} clearfix`}>
        {menu.map((item, index) => {
          let rand = Math.floor(1 + Math.random() * (8 - 1)); // 生成1-8的随机数
          while (randList.includes(rand)) {
            rand = Math.floor(1 + Math.random() * (8 - 1));
          }
          randList.push(rand);
          return (
            <PhotoBox
              key={item}
              classification={menu[index]}
              title={ClsEnum[item]}
              rand={rand}
            ></PhotoBox>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
