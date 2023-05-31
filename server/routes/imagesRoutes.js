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
  .patch(imageController.updateClass)
  .delete(imageController.delSingle);
router.delete('/delMany', imageController.delMany);
router.get('/getCount', imageController.getCount);

module.exports = router;
