import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

// css
import style from './index.module.scss';

// antd
import {
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Badge,
  Tooltip,
} from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// interface
import { loginUser, userObj } from '@/interface/userApi';

// api
import { userApi } from '@/api/users';

// provider
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';
import { useGlobalModal } from '@/components/ContextProvider/ModalProvider';
import { setSelectedKey } from '@/redux/slice/universal';

// redux
import { useAppDispatch, useAppSelector } from '@/redux';
import { useSearchParams } from 'react-router-dom';

interface DataType {
  key: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

interface EditBtnProps {
  onClick: () => void;
}

interface EditInputProps {
  value: string;
  onBlur: (e: any) => void;
}

const EditBtn: React.FC<EditBtnProps> = ({ onClick }) => {
  return (
    <>
      <EditOutlined className={style.editBtn} onClick={onClick} />
    </>
  );
};

const EditInput: React.FC<EditInputProps> = ({ value, onBlur }) => {
  return (
    <Input
      autoFocus
      defaultValue={value}
      placeholder="请输入昵称"
      bordered={false}
      onBlur={onBlur}
    />
  );
};

const roleList = [
  { value: 'root', label: 'root' },
  { value: 'admin', label: 'admin' },
  { value: 'user', label: 'user' },
];

const EditUser: React.FC = () => {
  const msg = useGlobalMessage();
  const modal = useGlobalModal();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<DataType[]>();
  const [count, setCount] = useState(0);

  // edit框
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isRoleEdit, setIsRoleEdit] = useState(false);
  const [curEditRole, setCurEditRole] = useState('');
  const [cur, setCur] = useState(0);

  //nav
  const [search] = useSearchParams();
  const page = search.get('page');

  const user = useAppSelector((state) => state.universal.user) as loginUser;

  // 列表格式
  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        render: (value, record, index) => {
          return (
            <>
              {isNameEdit && cur === index ? (
                <EditInput
                  value={value}
                  onBlur={(e) => {
                    const val = e.currentTarget.value;
                    if (val !== value)
                      userApi.updateUser(
                        {
                          id: record.id,
                          name: e.currentTarget.value,
                        },
                        async () => {
                          await msg.successAwait('更新成功');
                          setIsNameEdit(false);
                          navigate(0);
                        },
                        (err) => {
                          msg.error(err);
                        }
                      );
                    else setIsNameEdit(false);
                  }}
                />
              ) : (
                <>
                  {value}
                  {user?.role === 'root' ||
                  (user?.role === 'admin' && record.role !== 'root') ? (
                    <EditBtn
                      onClick={() => {
                        setIsNameEdit(true);
                        setCur(index);
                      }}
                    />
                  ) : undefined}
                </>
              )}
            </>
          );
        },
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render: (value, record, index) => {
          return (
            <>
              {isEmailEdit && cur === index ? (
                <EditInput
                  value={value}
                  onBlur={(e) => {
                    const val = e.currentTarget.value;
                    if (val !== value)
                      userApi.updateUser(
                        {
                          id: record.id,
                          email: e.currentTarget.value,
                        },
                        async () => {
                          await msg.successAwait('更新成功');
                          setIsNameEdit(false);
                          navigate(0);
                        },
                        (err) => {
                          msg.error(err);
                        }
                      );
                    else setIsEmailEdit(false);
                  }}
                />
              ) : (
                <>
                  {value}
                  {user?.role === 'root' ||
                  (user?.role === 'admin' && record.role !== 'root') ? (
                    <EditBtn
                      onClick={() => {
                        setIsEmailEdit(true);
                        setCur(index);
                      }}
                    />
                  ) : undefined}
                </>
              )}
            </>
          );
        },
      },
      {
        title: '权限',
        key: 'role',
        dataIndex: 'role',
        render: (value, record, index) => {
          const { role, id } = record;
          return (
            <>
              {isRoleEdit && cur === index ? (
                <Select
                  autoFocus
                  defaultValue={role}
                  style={{ width: 120 }}
                  onBlur={() => {
                    setIsRoleEdit(false);
                  }}
                  onChange={(value) => {
                    userApi.updateRole({ id, role: value });
                    navigate(0);
                  }}
                  options={roleList}
                />
              ) : (
                <>
                  {role === 'root' ? (
                    <Tag color="purple">{role.toUpperCase()}</Tag>
                  ) : role === 'admin' ? (
                    <Tag color="error">{role.toUpperCase()}</Tag>
                  ) : (
                    <Tag color="blue">{role.toUpperCase()}</Tag>
                  )}
                  {user?.id === record.id ? null : user?.role === 'root' ? (
                    <EditBtn
                      onClick={() => {
                        setIsRoleEdit(true);
                        setCur(index);
                      }}
                    />
                  ) : null}
                </>
              )}
            </>
          );
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (value, record) => (
          <Button
            danger
            disabled={
              user?.role === 'admin'
                ? !(record.role !== 'root' && record.role !== 'admin')
                : false
            }
            onClick={() => {
              modal.confirm({
                title: '提示',
                content:
                  '删除该用户会连带删除所有该用户下的相片，确定要删除该用户么？',
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
  }, [isNameEdit, isEmailEdit, isRoleEdit]);

  useEffect(() => {
    // 路由守卫
    if (user?.role !== 'admin' && user?.role !== 'root') {
      navigate('/manage');
      // msg.error('没有权限');
    }
    dispatch(setSelectedKey('user'));
  }, []);

  useEffect(() => {
    userApi.getUsers(
      {
        page: page ? page : 1,
        limit: 8,
        fields: '',
        sort: '+_id',
      },
      (res) => {
        const p = page ? parseInt(page) : 1;
        if (!res.data.users.length && p > 1)
          navigate(`/manage/user?page=${p - 1}`);
        const data = res.data.users.map((user: userObj) => {
          const { name, email, id, role } = user;
          return { key: id, id, name, email, role } as DataType;
        });
        setUsers(data);
      },
      (content) => {
        msg.error(content);
      }
    );
    userApi.getCount(
      '',
      (res) => {
        setCount(res.data.count);
      },
      (content) => {
        msg.error(content);
      }
    );
  }, [page]);

  return (
    <div className={style.wrapper}>
      <Tooltip title="添加用户">
        <Button
          size="large"
          icon={<PlusOutlined />}
          style={{
            paddingLeft: '30px',
            paddingRight: '50px',
            marginBottom: 20,
          }}
          onClick={() => {
            setOpen(true);
          }}
        ></Button>
      </Tooltip>

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
            &nbsp;admin：所有权限（OSS,SMTP不可更改/用户权限不可更改）
          </div>
          <div>
            <Badge color="rgb(45, 183, 245)"></Badge>&nbsp;user：仅编辑照片
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
              options={user?.role === 'admin' ? roleList.slice(2, 3) : roleList}
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
      <Table
        columns={columns}
        dataSource={users}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 8,
          total: count,
          current: page ? parseInt(page) : 1,
          showSizeChanger: false,
          showQuickJumper: false,
          onChange: (page) => {
            navigate(`/manage/user?page=${page}`);
          },
        }}
      />
    </div>
  );
};

export default EditUser;
