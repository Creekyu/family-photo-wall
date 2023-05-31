import React, { useMemo } from 'react';

// css
import style from './index.module.scss';

// interface
import { cls, ClsEnum } from '@/interface/imagesApi';

// comp
import PhotoBox from '@/components/Homepage/PhotoBox';

// img
import img from '@/assets/images/home.png';

const menu = ['now', 'memory', 'bigEvent', 'others'] as cls[];
const HomePage = () => {
  const randList = useMemo(() => {
    return [] as number[];
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.logo} style={{ backgroundImage: `url(${img})` }}>
        <div>My Family My Memory</div>
      </div>
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
