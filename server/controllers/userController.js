const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');
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
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.addUser = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  let user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
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

exports.delUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const filteredBody = filterObj(req.body.updateForm, 'name', 'email', 'role');
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
