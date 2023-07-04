const OSSModel = require('../models/OSSModel');
const OSS = require('ali-oss');

// 获取OSSClient
const getOSSClient = async () => {
  const res = await OSSModel.getInstance();
  const { region, accessKeyId, accessKeySecret, bucket } = res;
  const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
  });
  return Promise.resolve(client);
};

// 获取OSSConfig
const getOSSConfig = async () => {
  const res = await OSSModel.getInstance();
  const { accessKeyId, accessKeySecret, bucket, callbackUrl, dir } = res;
  return Promise.resolve({
    accessKeyId,
    accessKeySecret,
    bucket,
    callbackUrl,
    dir,
  });
};

module.exports = { getOSSClient, getOSSConfig };
