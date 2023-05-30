const express = require('express');
const imageController = require('../controllers/imageController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));
router.route('/').post(imageController.addPhotos);

module.exports = router;
