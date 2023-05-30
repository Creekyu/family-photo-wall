import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

// antd
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Form, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { RcFile } from 'antd/lib/upload';

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
}

const AliyunOSSUpload = ({ value, onChange }: AliyunOSSUploadProps) => {
  const message = useGlobalMessage();
  const [OSSData, setOSSData] = useState<OSSDataType>();
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
    if (success.length > 0 && file.status !== 'removed')
      message.success('上传成功');
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
    <Dragger {...uploadProps} listType="picture">
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
  useEffect(() => {
    dispatch(setSelectedKey('add'));
  }, []);
  return (
    <Form labelCol={{ span: 4 }}>
      <Form.Item name="photos">
        <AliyunOSSUpload />
      </Form.Item>
    </Form>
  );
};
export default AddPhoto;
