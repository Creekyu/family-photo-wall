const express = require('express');
const OSSPolicyController = require('../controllers/OSSPolicyController');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.use(AuthController.protect, AuthController.restrictTo('admin'));

router.get('/', OSSPolicyController.getPolicy);
router.post('/result', OSSPolicyController.getResult);

module.exports = router;
