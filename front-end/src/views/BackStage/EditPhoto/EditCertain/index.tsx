import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

// antd
import { Button, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';

// css
import style from './index.module.scss';

// redux
import { useAppDispatch } from '@/redux';
import { setSelectedKey } from '@/redux/slice/universal';

// api
import {
  delMany,
  delSingle,
  getCount,
  getSelfPhotos,
  updateImg,
} from '@/api/images';

// provider
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';
import { useGlobalModal } from '@/components/ContextProvider/ModalProvider';

// interface
import { ClsEnum, ImgObj, ColorEnum, clsValue } from '@/interface/imagesApi';

// global
import { THEME_COLOR } from '@/global';

interface DataType {
  key: React.Key;
  id: string;
  filename: string;
  uploadAt: string;
  photoTime: string;
  classification: string;
  url: string;
}

const getTableData = (photos: ImgObj[]) => {
  return photos.map((photo) => {
    const { _id, filename, uploadAt, photoTime, url, classification } = photo;
    return {
      key: _id,
      id: _id,
      url: url + filename,
      filename,
      uploadAt: moment(uploadAt).format('YYYY-MM-DD'),
      photoTime: moment(photoTime).format('YYYY-MM-DD'),
      classification: ClsEnum[classification],
    } as DataType;
  });
};

const EditCertain = () => {
  const modal = useGlobalModal();
  const message = useGlobalMessage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // nav params
  const { state: classification } = useLocation();
  const [search] = useSearchParams();
  const page = search.get('page');

  // state
  const [photos, setPhotos] = useState<ImgObj[]>([]);
  const [count, setCount] = useState(0);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [selValue, setSelValue] = useState(classification);

  // table columns
  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '文件名',
        dataIndex: 'filename',
      },
      {
        title: '预览',
        dataIndex: 'url',
        render: (_, { url }) => {
          return (
            <img
              key={url}
              src={url}
              alt="photo"
              style={{ maxHeight: 100, maxWidth: 100 }}
            />
          );
        },
      },
      {
        title: '分类',
        dataIndex: 'classification',
        render: (_, { classification }) => {
          return (
            <Tag
              color={ColorEnum[classification as clsValue]}
              key={classification}
            >
              {classification}
            </Tag>
          );
        },
      },
      {
        title: '上传时间',
        dataIndex: 'uploadAt',
      },
      {
        title: '照片时间',
        dataIndex: 'photoTime',
      },
      {
        title: '删除',
        dataIndex: 'del',
        render: (_, { filename }) => {
          return (
            <>
              <Button
                icon={<DeleteOutlined />}
                onClick={() => {
                  modal.confirm({
                    title: '提示',
                    content: '确定要删除该照片吗？',
                    onOk: () => {
                      delSingle(
                        filename,
                        async () => {
                          await message.loadingAsync('删除中...', '删除成功!');
                          navigate(0);
                        },
                        (content) => {
                          message.error(content);
                        }
                      );
                    },
                  });
                }}
                danger
              >
                删除
              </Button>
            </>
          );
        },
      },
    ];
  }, []);

  // 更改选项
  useEffect(() => {
    dispatch(setSelectedKey(classification));
    setSelValue(classification);
  }, [classification]);

  // 请求对应的数据
  useEffect(() => {
    getSelfPhotos(
      {
        page: page ? page : 1,
        limit: 6,
        fields: '',
        sort: '-_id',
        options: `classification=${classification}`,
      },
      (res) => {
        const p = page ? parseInt(page) : 1;
        if (!res.data.images.length && p > 1)
          navigate(`/manage/edit?page=${p - 1}`, { state: classification });
        setPhotos(res.data.images);
      },
      (content) => {
        message.error(content);
      }
    );
    getCount(
      classification,
      (res) => {
        setCount(res.data.count);
      },
      (content) => {
        message.error(content);
      }
    );
  }, [classification, page]);

  return (
    <div className={style.wrapper}>
      <div className={style.tip}>
        <span>批量操作</span>
        <FormOutlined style={{ color: THEME_COLOR }} />
      </div>
      <div className={style.func}>
        <span>选择分类：</span>
        <Select
          value={selValue}
          style={{ width: 160 }}
          onChange={(value) => {
            setSelValue(value);
          }}
          disabled={!selectedList.length}
          options={[
            { value: 'now', label: '即时上传' },
            { value: 'memory', label: '往事回忆' },
            { value: 'bigEvent', label: '大事记' },
            { value: 'others', label: '其他' },
          ]}
        />
        <Button
          className={style.editBtn}
          icon={<EditOutlined />}
          disabled={!selectedList.length}
          onClick={() => {
            modal.confirm({
              title: '提示',
              content: '是否修改这些相片的分类？',
              onOk: () => {
                updateImg(
                  { fileList: selectedList, classification: selValue },
                  async () => {
                    await message.loadingAsync('修改中...', '修改成功！');
                    navigate(0);
                  },
                  (content) => {
                    message.error(content);
                  }
                );
              },
            });
          }}
        >
          修改
        </Button>
        <Button
          className={style.editBtn}
          icon={<DeleteOutlined />}
          danger
          disabled={!selectedList.length}
          onClick={() => {
            modal.confirm({
              title: '提示',
              content: '确定要删除这些照片吗？',
              onOk: () => {
                delMany(selectedList, async () => {
                  await message.loadingAsync('删除中...', '删除成功！');
                  navigate(0);
                });
              },
            });
          }}
        >
          删除
        </Button>
      </div>
      <div className={style.table}>
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: (_, selectedRows: DataType[]) => {
              setSelectedList(selectedRows.map((row) => row.filename));
            },
          }}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 6,
            total: count,
            current: page ? parseInt(page) : 1,
            showSizeChanger: false,
            showQuickJumper: false,
            onChange: (page) => {
              navigate(`/manage/edit?page=${page}`, { state: classification });
            },
          }}
          columns={columns}
          dataSource={getTableData(photos)}
        />
      </div>
    </div>
  );
};

export default EditCertain;
