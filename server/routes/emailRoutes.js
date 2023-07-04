const express = require('express');
const emailController = require('../controllers/emailController');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.use(AuthController.protect, AuthController.restrictTo('admin'));

router
  .route('/')
  .get(emailController.getConfig)
  .post(emailController.setConfig);

module.exports = router;
