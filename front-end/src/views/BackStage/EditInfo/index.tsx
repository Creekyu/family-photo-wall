import React, {
  RefObject,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useNavigate } from 'react-router';

// antd
import { Badge } from 'antd';

// css
import style from './index.module.scss';

// redux
import { useAppDispatch, useAppSelector } from '@/redux';
import { setSelectedKey, setUser } from '@/redux/slice/universal';

// comp
import ChangeFormBox from '@/components/BackStage/ChangeFormBox';

// api
import { userApi } from '@/api/users';

// provider
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

const EditInfo = () => {
  const msg = useGlobalMessage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState([false, false, false]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.universal.user);

  // ref

  // psw Ref
  const oldPswRef = useRef<HTMLInputElement>(null);
  const pswRef = useRef<HTMLInputElement>(null);
  const pswCfmRef2 = useRef<HTMLInputElement>(null);

  // email ref
  const emailRef = useRef<HTMLInputElement>(null);

  // name ref
  const nameRef = useRef<HTMLInputElement>(null);

  // 实现展开Form动画
  const openForm = useCallback(
    (state: boolean, chosenList: boolean[], key: number) => {
      const newList = [];
      for (let i = 0; i < chosenList.length; i += 1) {
        const div = document.getElementById(
          'change-form-box-anime-' + i
        ) as HTMLElement;
        if (i === key) {
          newList.push(state);
          // 如果打开就设置为scrollHeight
          if (state) div.style.height = div.scrollHeight + 'px';
          else div.style.height = '0';
        } else {
          newList.push(false);
          // 其他关闭
          div.style.height = '0';
        }
      }
      setIsOpen(newList);
    },
    []
  );

  // 获取表单内数据
  const getFormValues = useCallback(
    (
      mainRef: RefObject<HTMLInputElement>,
      otherRef?: RefObject<HTMLInputElement>,
      otherRef2?: RefObject<HTMLInputElement>
    ) => {
      const main = mainRef.current as HTMLInputElement;
      let other;
      let other2;
      if (otherRef) other = otherRef.current as HTMLInputElement;
      if (otherRef2) other2 = otherRef2.current as HTMLInputElement;
      return Object.assign(
        { [main.name]: main.value },
        other ? { [other.name]: other.value } : undefined,
        other2 ? { [other2.name]: other2.value } : undefined
      );
    },
    []
  );

  // 统一成功回调
  const uniCallback = (fn?: () => void) => {
    return async () => {
      await msg.loadingAsync('请稍等...', '修改成功！');
      setIsLoading(false);
      navigate(0);
      fn ? fn() : undefined;
    };
  };

  // 统一失败回调
  const uniFail = async (err: string) => {
    await msg.error(err);
    setIsLoading(false);
  };

  // 密码表单
  const handlePasswordForm = useCallback(async () => {
    setIsLoading(true);
    const data = getFormValues(oldPswRef, pswRef, pswCfmRef2);
    userApi.updatePsw(data, uniCallback(), uniFail);
  }, []);

  // email表单
  const handleEmailForm = useCallback(async () => {
    setIsLoading(true);
    const data = getFormValues(emailRef);
    userApi.updateMe(
      data,
      uniCallback(() => {
        dispatch(setUser(Object.assign({}, user, { email: data.email })));
      }),
      uniFail
    );
  }, []);

  // name表单
  const handleNameForm = useCallback(async () => {
    setIsLoading(true);
    const data = getFormValues(nameRef);
    userApi.updateMe(
      data,
      uniCallback(() => {
        dispatch(setUser(Object.assign({}, user, { name: data.name })));
      }),
      uniFail
    );
  }, []);

  useEffect(() => {
    dispatch(setSelectedKey('self'));
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <div></div>
        <div>账户与安全</div>
      </div>
      <ChangeFormBox
        name="oldPassword"
        title="密码"
        placeHolder="***********"
        isOpen={isOpen}
        handleClose={openForm}
        handleSubmit={handlePasswordForm}
        isLoading={isLoading}
        type="password"
        seq={0}
        ref={oldPswRef}
      >
        <div>
          <input
            type="password"
            placeholder="新密码"
            name="password"
            ref={pswRef}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="确认密码"
            name="passwordConfirm"
            ref={pswCfmRef2}
          />
        </div>
      </ChangeFormBox>
      <ChangeFormBox
        title="邮箱"
        placeHolder={user?.email}
        isOpen={isOpen}
        handleClose={openForm}
        isLoading={isLoading}
        handleSubmit={handleEmailForm}
        type="text"
        seq={1}
        name="email"
        ref={emailRef}
      >
        <div>
          <Badge color="lime" style={{ fontSize: 12 }}></Badge>
          <span style={{ marginLeft: 5, fontSize: 12 }}>
            目前邮箱仅作为登录账户凭证使用，可随意更改无需验证，符合邮箱正则即可
          </span>
        </div>
      </ChangeFormBox>
      <div className={style.title}>
        <div></div>
        <div>个人信息</div>
      </div>
      <ChangeFormBox
        title="昵称"
        placeHolder={user?.name}
        isOpen={isOpen}
        handleClose={openForm}
        isLoading={isLoading}
        handleSubmit={handleNameForm}
        type="text"
        seq={2}
        name="name"
        ref={nameRef}
      ></ChangeFormBox>
    </div>
  );
};

export default EditInfo;
