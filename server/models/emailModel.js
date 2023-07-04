const mongoose = require('mongoose');
const validator = require('validator');

const emailSchema = new mongoose.Schema({
  // 邮箱
  email: {
    type: String,
    required: [true, '请输入邮箱地址!'],
    lowercase: true,
    validate: [validator.isEmail, '请提供有效的邮箱地址!'],
  },
  // 密码
  password: {
    type: String,
    required: [true, '请输入密码！'],
  },
  host: {
    type: String,
    required: [true, '请输入host'],
  },
  port: {
    type: String,
    required: [true, '请输入port'],
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

emailSchema.pre(/^find/, function (next) {
  this.find().select('-__v');
  next();
});

// 定义静态方法获取单例实例
emailSchema.statics.getInstance = async function () {
  let instance = await this.findOne().exec();
  if (!instance) {
    instance = new this({
      email: 'test@photo.com',
      password: ' ',
      host: ' ',
      port: ' ',
      isUsed: false,
    });
    await instance.save();
  }
  return instance;
};

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
