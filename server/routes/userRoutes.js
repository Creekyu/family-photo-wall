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

// 限制权限
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

// 用户管理
router.route('/').get(userController.getAllUsers).post(userController.addUser);
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
