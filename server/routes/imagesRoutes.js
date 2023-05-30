const express = require('express');
const imageController = require('../controllers/imageController');
const authController = require('../controllers/authController');
const router = express.Router();

// router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/')
  .get(imageController.getPhotos)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    imageController.addPhotos
  );

module.exports = router;
