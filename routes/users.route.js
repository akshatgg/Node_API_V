const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post('/sign-up', userController.create);

router.post('/login', userController.login);

module.exports = router;
