const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, 'filename不能为空!'],
    unique: [true, '该文件已经上传至应用服务器'],
  },
  classification: {
    type: String,
    enum: ['memory', 'timeline', 'bigEvent', 'now', 'others'],
    default: 'now',
  },
});

imageSchema.pre(/^find/, function (next) {
  this.find().select('-__v');
  next();
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
