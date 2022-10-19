const express = require('express');
const router = express.Router();
const panController = require('../../controllers/sandbox/pan.controller')
const checkAuth = require('../../middleware/check-auth')
const queryValidator = require('../../middleware/query-validator')

router.get('/check-pan-aadhaar-status', checkAuth, queryValidator, panController.checkPanAADHARStatus);

router.get('/get-pan-details', checkAuth, queryValidator, panController.getAdvancePanDetails);

module.exports = router;
