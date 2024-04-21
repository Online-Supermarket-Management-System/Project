const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.post('/send_recovery_email', adminController.sendRecoveryEmail);
router.post('/reset_password', adminController.resetPassword);

module.exports = router;
