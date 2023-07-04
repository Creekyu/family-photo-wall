const express = require('express');
const OSSPolicyController = require('../controllers/OSSPolicyController');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.use(AuthController.protect, AuthController.restrictTo('admin'));
// policy
router.post('/setConfig', OSSPolicyController.setConfig);
router.get('/getConfig', OSSPolicyController.getConfig);

router.get('/', OSSPolicyController.getPolicy);
router.post('/result', OSSPolicyController.getResult);

module.exports = router;
