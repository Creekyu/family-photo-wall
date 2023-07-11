const express = require('express');
const OSSPolicyController = require('../controllers/OSSPolicyController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/setConfig',
  authController.protect,
  authController.restrictTo('root'),
  OSSPolicyController.setConfig
);

router.use(
  authController.protect,
  authController.restrictTo('admin', 'root', 'user')
);
// policy
router.get('/getConfig', OSSPolicyController.getConfig);

router.get('/', OSSPolicyController.getPolicy);
router.post('/result', OSSPolicyController.getResult);

module.exports = router;
