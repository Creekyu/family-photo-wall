const mongoose = require('mongoose');

const OSSSchema = new mongoose.Schema({
  region: {
    type: String,
    required: [true, 'region不能为空'],
  },
  accessKeyId: {
    type: String,
    required: [true, 'keyID不能为空'],
  },
  accessKeySecret: {
    type: String,
    required: [true, 'keySecret不能为空'],
  },
  bucket: {
    type: String,
    required: [true, 'bucket不能为空'],
  },
  callbackUrl: {
    type: String,
    default: '',
  },
  dir: {
    type: String,
    default: '',
  },
  isUsed: {
    type: Boolean,
    default: true,
  },
});

OSSSchema.pre(/^find/, function (next) {
  this.find().select('-__v');
  next();
});

// 定义静态方法获取单例实例
OSSSchema.statics.getInstance = async function () {
  let instance = await this.findOne().exec();
  if (!instance) {
    instance = new this({
      region: 'oss-cn-chengdu',
      accessKeyId: 'LTAI5t95qXkpmNHV8hc78NKW', // 示例
      accessKeySecret: 'IX9GgRnlRA3PYUPiPD1MVnsxfWc64E', // 示例
      bucket: 'init-bucket',
      callbackUrl: '',
      dir: '',
      isUsed: false,
    });
    await instance.save();
  }
  return instance;
};

const OSS = mongoose.model('OSS', OSSSchema);

module.exports = OSS;
