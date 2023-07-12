import React, { CSSProperties, useState, forwardRef } from 'react';

// css
import style from './index.module.scss';

// antd
import { Button } from 'antd';

// global
import { THEME_COLOR } from '@/global';

interface ChangeFormBoxProps {
  placeHolder?: string;
  title?: string;
  isOpen: boolean[];
  children?: React.ReactNode;
  handleClose?: (state: boolean, chosenList: boolean[], key: number) => void;
  handleSubmit: () => void;
  isLoading?: boolean;
  type: string;
  seq: number;
  name?: string;
  single?: boolean;
  okText?: string;
}

// children必须是按照制定规范的块
const ChangeFormBox = forwardRef<HTMLInputElement, ChangeFormBoxProps>(
  (props, ref) => {
    const {
      placeHolder,
      title,
      isOpen,
      children,
      handleClose,
      handleSubmit,
      type,
      seq,
      name,
      isLoading,
      single,
      okText,
    } = props;
    const [isFocus, setIsFocus] = useState(false);
    const styles: CSSProperties = {
      color: THEME_COLOR,
      borderColor: THEME_COLOR,
    };
    return (
      <div
        className={style.wrapper}
        style={{
          border: isOpen[seq]
            ? '1px solid rgba(0,0,0,.2)'
            : '1px solid transparent',
        }}
      >
        <div className={style.title}>{title}</div>
        <div className={style.form}>
          <div
            className={style.mainInput}
            onClick={() => {
              if (handleClose) handleClose(true, isOpen, seq);
            }}
          >
            <input
              type={type}
              name={name}
              ref={ref}
              onFocus={(event) => {
                setIsFocus(true);
                if (type === 'password')
                  event.currentTarget.placeholder = '当前密码';
              }}
              onBlur={(event) => {
                setIsFocus(false);
                if (type === 'password')
                  event.currentTarget.placeholder = '********';
              }}
              placeholder={placeHolder}
            />
            <div className="iconfont" style={isFocus ? styles : undefined}>
              &#xe601;
            </div>
          </div>
          <div
            id={`change-form-box-anime-${seq}`}
            className={style.otherInput}
            style={{ height: single ? '70px' : undefined }}
          >
            {children}
            <div style={{ marginBottom: `15px` }}>
              <Button
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={handleSubmit}
                loading={isLoading}
              >
                {okText ? okText : '确定'}
              </Button>
              {single ? undefined : (
                <Button
                  onClick={() => {
                    if (handleClose) handleClose(false, isOpen, seq);
                  }}
                >
                  取消
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
// 解决forwardRef报错
ChangeFormBox.displayName = 'ChangeFormBox';
export default ChangeFormBox;
