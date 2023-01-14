const express = require('express');
const taxController = require('../../controllers/sandbox/taxController');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth')
const queryValidator = require('../../middleware/query-validator')

router.get('/get-cash-itc-balence',checkAuth, queryValidator,taxController.cashItcBalance);
router.get('/get-cash-itc-legers',checkAuth, queryValidator,taxController.itcLedgers);
router.get('/get-itc-chash-ledgers',checkAuth, queryValidator,taxController.cashLedger);

module.exports = router;
