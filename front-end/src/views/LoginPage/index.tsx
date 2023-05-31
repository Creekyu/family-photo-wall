import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import isEmail from 'validator/lib/isEmail';

// antd
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

// css
import style from './index.module.scss';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

// api
import { userApi } from '@/api/users';
// import { OSSApi } from '@/api/OSS';

// interface
import { LoginFormObj } from '@/interface/userApi';

// redux
import { setIsLogin } from '@/redux/slice/backstage';
import { useAppDispatch } from '@/redux';

const LoginForm = () => {
  const message = useGlobalMessage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // Handle Submit
  const onFinish = (values: LoginFormObj) => {
    setLoading(true);
    if (!isEmail(values.email)) {
      message.error('请输入正确的邮箱！');
      return setLoading(false);
    }
    // api
    userApi.login(
      values,
      async (data) => {
        await message.loadingAsync('登录中...', '登录成功');
        const cookies = new Cookies();
        const user = data.data.user;
        // 设置token
        delete user['_id'];
        // 设置cookie持续时间90天
        const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        cookies.set('user', user, { expires });
        cookies.set('token', data.token, { expires });
        dispatch(setIsLogin(true));
        // // 获取OSSPolicy
        // OSSApi.getOSSPolicy(
        //   '',
        //   (data) => {
        //     console.log(data.expires, Date.now());
        //     cookies.set('OSSPolicy', data, {
        //       expires: new Date(data.expires),
        //     });
        //   },
        //   (content) => {
        //     message.error(content);
        //   },
        //   () => {
        //     setLoading(false);
        //   }
        // );
        // 跳转
        navigate('/manage/add');
      },
      (content) => {
        message.error(content);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.formWrapper}>
        <div className={style.logo}>后台管理系统</div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          className={style.form}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱！' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className={style.btn}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
