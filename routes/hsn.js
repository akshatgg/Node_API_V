const express = require('express');
const router = express.Router();
const hsnController = require('../controllers/hsn.controller')
router.get('/getHsn', hsnController.getHsnCode);
router.get('/getSac', hsnController.getSacCode);
module.exports = router;