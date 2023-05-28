import React, { useEffect, useState } from 'react';

// antd
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Form, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { getOSSPolicy } from '@/api/OSS';

const { Dragger } = Upload;

// context
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

// redux
import { useAppDispatch } from '@/redux';
import { setSelectedKey } from '@/redux/slice/backstage';

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

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
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

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    file.url = OSSData.dir + filename;

    return file;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    multiple: true,
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
  };

  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
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
