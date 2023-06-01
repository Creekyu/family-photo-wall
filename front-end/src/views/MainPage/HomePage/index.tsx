import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// css
import style from './index.module.scss';

// interface
import { cls, ClsEnum } from '@/interface/imagesApi';

// comp
import PhotoBox from '@/components/Homepage/PhotoBox';
import TopDisplay from '@/components/TopDisplay';
import LoadingComp from '@/components/LoadingComp';

// img
import img from '@/assets/images/home.png';

// redux
import { useAppDispatch, useAppSelector } from '@/redux';
import { setChosen } from '@/redux/slice/universal';

const menu = ['now', 'memory', 'bigEvent', 'others'] as cls[];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const randList = useAppSelector((state) => state.universal.randList);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    dispatch(setChosen(0));
  }, []);

  return (
    <div className={style.wrapper}>
      <TopDisplay img={img}></TopDisplay>
      <div className={`${style.content} clearfix`}>
        <div className={loading ? undefined : style.noLoading}>
          <LoadingComp></LoadingComp>
        </div>
        <div className={loading ? style.noActive : style.active}>
          {menu.map((item, index) => {
            return (
              <PhotoBox
                key={item}
                classification={menu[index]}
                title={ClsEnum[item]}
                rand={randList[index]}
                onClick={() => {
                  navigate('/class', { state: { classification: item } });
                }}
              ></PhotoBox>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
