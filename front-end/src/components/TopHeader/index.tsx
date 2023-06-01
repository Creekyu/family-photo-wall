import React from 'react';

// css
import style from './index.module.scss';

// comp
import LinkBtn from '@/components/TopHeader/LinkBtn';

const menu = ['首页', '时间轴', '往事回忆', '大事记', '即时上传', '其他'];
const TopHeader = () => {
  return (
    <div className={`${style.wrapper} clearfix`}>
      <div className={style.content}>
        <div className={style.logo}>Family Photo Wall</div>
        <div className={style.btns}>
          {menu.map((item, index) => {
            return (
              <LinkBtn seq={index} key={item}>
                {item}
              </LinkBtn>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
