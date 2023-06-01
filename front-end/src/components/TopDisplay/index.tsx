import React from 'react';

// css
import style from './index.module.scss';

interface TopDisplayProps {
  img: any;
}

const TopDisplay: React.FC<TopDisplayProps> = ({ img }) => {
  return (
    <div className={style.logo} style={{ backgroundImage: `url(${img})` }}>
      <div>My Family My Memory</div>
    </div>
  );
};

export default TopDisplay;
