import React from 'react';

// css
import style from './index.module.scss';

// util
import { onPreview } from '@/utils';

interface TopDisplayProps {
  img: any;
}

const TopDisplay: React.FC<TopDisplayProps> = ({ img }) => {
  return (
    <div
      className={style.logo}
      style={{ backgroundImage: `url(${img})` }}
      onClick={() => {
        onPreview(img);
      }}
    >
      <div>My Family My Memory</div>
    </div>
  );
};

export default TopDisplay;
