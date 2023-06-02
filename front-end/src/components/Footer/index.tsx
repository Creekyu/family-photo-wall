import React from 'react';

// css
import style from './index.module.scss';

// img
import img from '@/assets/images/备案图标.png';

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.ICInfo}>
        <div className={style.PSIC}>
          <div
            className={style.ICIcon}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
          <a href="http://www.beian.gov.cn/" target="_blank" rel="noreferrer">
            公安备案
          </a>
        </div>
        <div className={style.line}>|</div>
        <a
          className={style.ICP}
          href="https://beian.miit.gov.cn"
          rel="noreferrer"
          target="_blank"
        >
          ICP备案
        </a>
      </div>
      <div className={style.protocol}>Copyright © Since 2023 Criiky0</div>
    </div>
  );
};
export default Footer;
