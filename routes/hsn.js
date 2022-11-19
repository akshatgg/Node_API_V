const express = require('express');
const router = express.Router();
const hsnController = require('../controllers/hsn.controller')
router.get('/getHsn', hsnController.getHsnCode);
module.exports = router;