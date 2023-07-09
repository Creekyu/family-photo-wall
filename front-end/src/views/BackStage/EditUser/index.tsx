import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

// css
import style from './index.module.scss';

// antd
import { Button, Table, Tag, Modal, Form, Input, Select, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// interface
import { userObj } from '@/interface/userApi';

// api
import { userApi } from '@/api/users';

// provider
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';
import { useGlobalModal } from '@/components/ContextProvider/ModalProvider';
import { setSelectedKey } from '@/redux/slice/universal';

// redux
import { useAppDispatch } from '@/redux';

interface DataType {
  key: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

const EditUser: React.FC = () => {
  const msg = useGlobalMessage();
  const modal = useGlobalModal();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<DataType[]>();

  // 列表格式
  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '权限',
        key: 'role',
        dataIndex: 'role',
        render: (_, { role }) => (
          <>
            {role === 'admin' ? (
              <Tag color="error">{role.toUpperCase()}</Tag>
            ) : role === 'user' ? (
              <Tag color="blue">{role.toUpperCase()}</Tag>
            ) : (
              <Tag color="success">{role.toUpperCase()}</Tag>
            )}
          </>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (value) => (
          <Button
            danger
            onClick={() => {
              modal.confirm({
                title: '提示',
                content: '确定要删除该用户么？',
                onOk: () => {
                  userApi.delUser(
                    value.id,
                    async () => {
                      await msg.loadingAsync('请稍等...', '删除成功');
                      navigate(0);
                    },
                    (err) => {
                      msg.error(err);
                    }
                  );
                },
              });
            }}
          >
            删除
          </Button>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    dispatch(setSelectedKey('user'));
  }, []);

  useEffect(() => {
    userApi.getUsers(
      '',
      (res) => {
        const data = res.data.users.map((user: userObj) => {
          const { name, email, id, role } = user;
          return { key: id, id, name, email, role } as DataType;
        });
        setUsers(data);
      },
      (err) => {
        msg.error(err);
      }
    );
  }, []);
  return (
    <>
      <Button
        size="large"
        icon={<PlusOutlined />}
        style={{ paddingLeft: '30px', paddingRight: '50px', marginBottom: 20 }}
        onClick={() => {
          setOpen(true);
        }}
      ></Button>
      <Modal
        centered
        open={open}
        footer={null}
        closable={false}
        width={500}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div className={style.tips2}>
          <Badge color="lime"></Badge>&nbsp;注意：初始账户用户密码为123456
        </div>
        <div className={style.tips}>
          <div>
            <Badge color="lime"></Badge>&nbsp;权限说明：
          </div>
          <div>
            <Badge color="rgb(45, 183, 245)"></Badge>&nbsp;root：所有权限
          </div>
          <div>
            <Badge color="rgb(45, 183, 245)"></Badge>
            &nbsp;admin：所有权限（OSS,SMTP不可更改）
          </div>
          <div>
            <Badge color="rgb(45, 183, 245)"></Badge>&nbsp;user：仅编辑照片
          </div>
          <div>
            <Badge color="rgb(45, 183, 245)"></Badge>&nbsp;visitor：无权限
          </div>
        </div>

        <Form
          className={style.form}
          labelCol={{ flex: '80px' }}
          labelAlign="right"
          labelWrap
          colon={false}
          onFinish={(values) => {
            userApi.addUser(
              values,
              async () => {
                await msg.loadingAsync('请稍等...', '添加成功!');
                navigate(0);
              },
              (err) => {
                msg.error(err);
              }
            );
          }}
        >
          <Form.Item label="昵称" name="name" rules={[{ required: true }]}>
            <Input placeholder="填写 username" />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true }]}>
            <Input placeholder="填写 email" />
          </Form.Item>
          <Form.Item
            label="权限"
            name="role"
            rules={[{ required: true }]}
            initialValue="user"
          >
            <Select
              style={{ width: 120 }}
              options={[
                { value: 'admin', label: 'admin' },
                { value: 'user', label: 'user' },
                { value: 'visitor', label: 'visitor' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <div className={style.addBtn}>
              <Button type="primary" htmlType="submit">
                添加
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={users} />
    </>
  );
};

export default EditUser;
