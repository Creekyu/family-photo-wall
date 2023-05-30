const OSS = require('ali-oss');
const catchAsync = require('../utils/catchAsync');

const client = new OSS({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  bucket: process.env.BUCKET,
});

exports.getPhotos = catchAsync(async (req, res) => {
  // 不带任何参数，默认最多返回100个文件。
  const result = await client.list();
  res.status(200).json({
    status: 'success',
    data: {
      objs: result.objects,
    },
  });
});
