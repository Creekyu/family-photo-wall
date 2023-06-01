import React from 'react';
import { useNavigate } from 'react-router';
import { THEME_COLOR } from '@/global';

// css
import style from './index.module.scss';

// redux
import { useAppDispatch, useAppSelector } from '@/redux';
import { setChosen } from '@/redux/slice/universal';

interface LinkBtnProps {
  seq: number;
  children: string;
}

const LinkBtn: React.FC<LinkBtnProps> = ({ seq, children }) => {
  const dispatch = useAppDispatch();
  const chosen = useAppSelector((state) => state.universal.chosen);
  const navigate = useNavigate();
  return (
    <div
      className={`${style.wrapper}`}
      onClick={() => {
        dispatch(setChosen(seq));
        switch (seq) {
          case 0:
            navigate('/');
            break;
          case 1:
            navigate('/timeline');
            break;
          case 2:
            navigate('/class', { state: { classification: 'memory' } });
            break;
          case 3:
            navigate('/class', { state: { classification: 'bigEvent' } });
            break;
          case 4:
            navigate('/class', { state: { classification: 'now' } });
            break;
          case 5:
            navigate('/class', { state: { classification: 'others' } });
            break;
        }
      }}
    >
      <div className={`${style.content} iconfont`}>
        <div
          className={style.title}
          style={chosen === seq ? { color: THEME_COLOR } : undefined}
        >
          {children}
        </div>
        <div className={chosen === seq ? style.chosenBar : style.bar}></div>
      </div>
    </div>
  );
};
export default LinkBtn;
