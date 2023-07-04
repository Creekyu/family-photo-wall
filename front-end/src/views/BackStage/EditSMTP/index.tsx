import React, { useEffect, useState } from 'react';

// antd
import { Button, Form, Input } from 'antd';

// css
import style from './index.module.scss';

// redux
import { useAppDispatch } from '@/redux';
import { setSelectedKey } from '@/redux/slice/universal';

// api
import { SMTPConfig } from '@/interface/emailApi';
import { getSMTPConfig, setSMTPConfig } from '@/api/email';

// provider
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

const EditOSS = () => {
  const dispatch = useAppDispatch();
  const msg = useGlobalMessage();
  const [config, setConfig] = useState<SMTPConfig>();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(setSelectedKey('smtp'));
    getSMTPConfig(
      '',
      (res) => {
        console.log(res.data);
        setConfig(res.data.smtp);
      },
      (err) => {
        msg.error(err);
      }
    );
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, []);

  return (
    <>
      {loading ? undefined : (
        <div className={style.wrapper}>
          <Form
            form={form}
            name="wrap"
            labelCol={{ flex: '120px' }}
            labelAlign="right"
            labelWrap
            colon={false}
            className={style.form}
            initialValues={{
              email: config?.email,
              password: config?.password,
              host: config?.host,
              port: config?.port,
            }}
            onFinish={(values) => {
              setSMTPConfig(
                values,
                () => {
                  msg.loadingSuccessAsync('保存中...', '保存成功!');
                },
                (err) => {
                  msg.error(err);
                }
              );
            }}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="设定 Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input placeholder="设定 Password" type="password" />
            </Form.Item>
            <Form.Item label="Host" name="host" rules={[{ required: true }]}>
              <Input placeholder="设定 Host" />
            </Form.Item>
            <Form.Item label="Port" name="port" rules={[{ required: true }]}>
              <Input placeholder="设定 port" />
            </Form.Item>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button
                style={{ marginLeft: '20px' }}
                type="primary"
                danger
                onClick={() => {
                  form.setFieldsValue({
                    email: '',
                    password: '',
                    host: '',
                    port: '',
                  });
                }}
              >
                清除
              </Button>
            </Form.Item>
            <Form.Item label=""></Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditOSS;
