import React from 'react';

// css
import style from './index.module.scss';

// interface
import { cls, ClsEnum } from '@/interface/imagesApi';

// comp
import PhotoBox from '@/components/Homepage/PhotoBox';

const menu = ['now', 'memory', 'bigEvent', 'others'] as cls[];
const HomePage = () => {
  return (
    <div className={style.wrapper}>
      <div className={`${style.content} clearfix`}>
        {menu.map((item, index) => {
          return (
            <PhotoBox
              key={item}
              classification={menu[index]}
              title={ClsEnum[item]}
            ></PhotoBox>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
