import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

// antd
import { Button, Table, Tag } from 'antd';
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
      <Table columns={columns} dataSource={users} />
    </>
  );
};

export default EditUser;
