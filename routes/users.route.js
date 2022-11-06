const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const emailController = require('../controllers/email.controller')

router.post('/sign-up', userController.create);
router.post('/send-email', emailController.sendEmail);

router.post('/login', userController.login);
router.post('/update-password', userController.updatePassword);
router.post('/update', userController.updateUser);
// User profile routes
router.post('/createProfile', userController.createProfile);
router.post('/update-profile', userController.updateProfile);
router.get('/getProfile', userController.getProfile);


// Business profile routes
router.post('/create-business-profile', userController.createBusinessProfile);
router.get('/get-business-profile', userController.getBusinessProfile);
router.post('/update-business-profile', userController.updateBusinessProfile);

module.exports = router;
