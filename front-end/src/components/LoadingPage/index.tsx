import React from 'react';

// antd
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import style from './index.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: '50px' }} spin />;
const LoadingPage = () => {
  return (
    <div className={style.wrapper}>
      <div>
        <Spin indicator={antIcon} />
      </div>
    </div>
  );
};

export default LoadingPage;
