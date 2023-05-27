import React from 'react';

// antd
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

// css
import style from './index.module.scss';

const LoginForm = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.formWrapper}>
        <div className={style.logo}>后台管理系统</div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          className={style.form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={style.btn}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
