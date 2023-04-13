const express = require('express');
const router = express.Router();
const StarHealthController = require('../controllers/starhealth.controller')
router.get('/getPlan', StarHealthController.getPlan);
module.exports = router;