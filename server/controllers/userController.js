const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Image = require('../models/imgModel');

// 用于对已经登录的用户刷新其状态
exports.updateLoginState = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// user manage
exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getCount = catchAsync(async (req, res) => {
  const count = await User.count({ active: true });
  res.status(200).json({
    status: 'success',
    data: {
      count,
    },
  });
});

exports.addUser = catchAsync(async (req, res) => {
  const { name, email, role } = req.body;
  let user = await User.create({
    name,
    email,
    password: '123456',
    passwordConfirm: '123456',
    role,
  });

  user = Object.assign(user, { password: '' });

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.delUser = catchAsync(async (req, res, next) => {
  // 验证权限
  const user = await User.findById(req.params.id);
  if (
    (req.user.role === 'admin' && user.role === 'root') ||
    user.role === 'admin'
  )
    return next(new AppError('权限不足！', 403));

  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

exports.updateRole = catchAsync(async (req, res) => {
  const filteredBody = filterObj(req.body, 'role');
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // 验证旧密码是否匹配
  if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
    return next(new AppError('旧密码输入错误，请重新输入！', 401));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('两次输入密码不一致，请重新输入！', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res) => {
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});
