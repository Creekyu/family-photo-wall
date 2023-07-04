const Email = require('../models/emailModel');
const catchAsync = require('../utils/catchAsync');

// 初始化
Email.getInstance();

exports.setConfig = catchAsync(async (req, res) => {
  const { email, password, host, port } = req.body;
  const smtp = await Email.findOneAndUpdate({
    email,
    password,
    host,
    port,
    isUsed: true,
  });

  res.status(201).json({
    status: 'success',
    data: {
      smtp,
    },
  });
});

exports.getConfig = catchAsync(async (req, res) => {
  const smtp = await Email.findOne();

  res.status(200).json({
    status: 'success',
    data: {
      smtp,
    },
  });
});
