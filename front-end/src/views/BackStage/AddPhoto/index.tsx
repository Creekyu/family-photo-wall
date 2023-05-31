import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { nanoid } from 'nanoid';

// antd
import { Form, Upload, Select, DatePicker } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd';
import 'dayjs/locale/zh-cn';

const { Dragger } = Upload;

// css
import style from './index.module.scss';

// context
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

// redux
import { useAppDispatch } from '@/redux';
import { setSelectedKey } from '@/redux/slice/backstage';

// api
import { getOSSPolicy } from '@/api/OSS';
import { addPhotos } from '@/api/images';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessid: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  select: string;
  time: Date;
}

const AliyunOSSUpload = ({
  value,
  onChange,
  select,
  time,
}: AliyunOSSUploadProps) => {
  const message = useGlobalMessage();
  const [OSSData, setOSSData] = useState<OSSDataType>();
  const [uploadList, setUploadList] = useState<string[]>([]);

  const init = async () => {
    getOSSPolicy(
      '',
      (data) => {
        setOSSData(data);
      },
      (content) => {
        message.error(content);
      }
    );
  };

  useEffect(() => {
    init();
  }, []);

  // 这里当OSS上传后进行应用服务器上传
  // 需要用防抖技术，否则会多次重复上传
  const debounce = useCallback(() => {
    let timer: any;
    return (
      files: UploadFile[],
      select: string,
      uploadList: string[],
      time: Date
    ) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // 过滤已经上传的
        const fileList = files.length
          ? files.filter((file) => {
              return !uploadList.includes(file.url as string);
            })
          : [];
        const photos = fileList.map((file) => {
          return {
            filename: file.url,
            classification: select,
            photoTime: time,
          };
        });
        if (photos.length)
          addPhotos(
            photos,
            () => {
              message.success('上传成功');
              setUploadList([
                ...uploadList,
                ...(photos.map((photo) => photo.filename) as string[]),
              ]);
            },
            (content) => {
              message.error(
                `上传至OSS成功但是上传至应用服务器失败：${content}`
              );
            }
          );
      }, 300);
    };
  }, []);

  const debounceFunc = useMemo(() => {
    return debounce();
  }, []);

  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    message.destroy();
    // 上传msg
    const uploads = fileList.filter((file) => {
      return file.status === 'uploading';
    });
    // 成功msg
    const success = fileList.filter((file) => {
      return file.status === 'done';
    });
    // 失败msg
    const error = fileList.filter((file) => {
      return file.status === 'error';
    });
    if (uploads.length > 0) message.loading('上传中');
    if (success.length > 0 && file.status !== 'removed') {
      // 应用服务器上传
      debounceFunc(fileList, select, uploadList, time);
    }
    if (error.length > 0) message.error('上传失败');
    // 修改状态列表
    onChange?.([...fileList]);
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);
    if (onChange) {
      onChange(files);
    }
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessid,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file, fileList) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    // 判断是否是图像
    const isImg = !!file.type.match('image');
    if (!isImg) message.error('请上传图片类文件！');
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = nanoid() + suffix;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    file.url = OSSData.dir + filename;
    return isImg || Upload.LIST_IGNORE;
  };

  // 预览
  const onPreview = async (file: UploadFile) => {
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
    const image = new Image();
    image.src = src as string;
    const imgWindow = window.open(src as string);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    multiple: true,
    onChange: handleChange,
    onRemove,
    onPreview,
    data: getExtraData,
    beforeUpload,
  };

  return (
    <Dragger {...uploadProps} listType="picture" height={300}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或者拖拽文件到此区域上传</p>
      <p className="ant-upload-hint">
        支持单个或批量上传。支持所有的图片格式格式，请勿上传其他文件！
      </p>
    </Dragger>
  );
};

const AddPhoto: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selValue, setSelValue] = useState('now');
  const [time, setTime] = useState<Date>(new Date(Date.now()));
  const dateFormat = 'YYYY/MM/DD';

  const handleChange = (value: string) => {
    setSelValue(value);
  };

  const handleTime = (value: any) => {
    setTime(value.$d);
  };

  useEffect(() => {
    dispatch(setSelectedKey('add'));
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.classSelect}>
        <span>请选择上传照片分类：</span>
        <Select
          defaultValue="now"
          style={{ width: 160 }}
          onChange={handleChange}
          options={[
            { value: 'now', label: '即时上传' },
            { value: 'memory', label: '往事回忆' },
            { value: 'bigEvent', label: '大事记' },
            { value: 'others', label: '其他' },
          ]}
        />
        <span>*</span>
        <span>用于前端不同照片展示区分类</span>
      </div>
      <div className={style.photoTime}>
        <span>请选择上传照片日期：</span>
        <DatePicker
          placeholder="请选择照片日期"
          format={dateFormat}
          onChange={handleTime}
        />
        <span>*</span>
        <span>用于时间轴展示（不填默认为当前时间）</span>
      </div>
      <div className={style.upload}>
        <Form labelCol={{ span: 4 }}>
          <Form.Item name="photos">
            <AliyunOSSUpload select={selValue} time={time} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default AddPhoto;
