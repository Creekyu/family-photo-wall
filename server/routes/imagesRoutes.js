const express = require('express');
const imageController = require('../controllers/imageController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', imageController.getPhotos);

// 权限设置
router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/')
  .post(imageController.addPhotos)
  .delete(imageController.delSingle);
router.delete('/delMany', imageController.delMany);

module.exports = router;
