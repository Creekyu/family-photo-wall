import React, { CSSProperties } from 'react';

// antd
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// css
import style from './index.module.scss';

// img
import img1 from '@/assets/images/loading.jpg';
import img2 from '@/assets/images/loading2.jpg';

const antIcon = <LoadingOutlined style={{ fontSize: '50px' }} spin />;

interface LoadingCompProps {
  styles?: CSSProperties;
  changeImg?: boolean;
  loading: boolean;
}

const LoadingComp: React.FC<LoadingCompProps> = ({
  loading,
  styles,
  changeImg,
}) => {
  const img = changeImg ? img2 : img1;
  return (
    <div className={loading ? style.wrapper : style.noLoading} style={styles}>
      <div
        className={style.photo}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className={style.tips}>Loading...</div>
      <div className={style.icon}>
        <Spin indicator={antIcon} />
      </div>
    </div>
  );
};

export default LoadingComp;
