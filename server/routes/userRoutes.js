const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// 登录
router.post('/login', authController.login);

// 注册
// router.post('/signup', authController.signup);

// 更改密码
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword', authController.resetPassword);

// 强制改密（自用）
// router.post('/changePsw', userController.updateUserPsw);

// 个人信息
router.patch(
  '/updateMe',
  authController.protect,
  authController.restrictTo('root', 'admin', 'user'),
  userController.updateMe
);

// 更改密码
router.post(
  '/updatePsw',
  authController.protect,
  authController.restrictTo('root', 'admin', 'user'),
  userController.updatePassword
);

// 更新权限
router.patch(
  '/updateRole/:id',
  authController.protect,
  authController.restrictTo('root'),
  userController.updateRole
);

// 限制
router.use(authController.protect);
router.use(authController.restrictTo('admin', 'root'));

// 用户管理
router.route('/').get(userController.getAllUsers).post(userController.addUser);
router.get('/count', userController.getCount);
router
  .route('/:id')
  .delete(userController.delUser)
  .patch(userController.updateUser);

// reset邮箱
// router.get('/resetEmail/:token', authController.resetEmail);

// 更换邮箱
// router.post('/updateEmail', authController.updateEmail);
// router.post('/sendLinkToNewEmail', authController.sendLinkToNewEmail);
// router.patch('/updateMyPassword', authController.updatePassword);

// 刷新登录状态
// router.get('/updateLoginState', userController.updateLoginState);

// 删除自己
// router.delete('/deleteMe', userController.deleteMe);

// router.route('/:id').get(userController.getUser);

module.exports = router;
