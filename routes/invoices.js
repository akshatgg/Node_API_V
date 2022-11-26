const express = require("express");
const {createInvoice, updateInvoice, deleteInvoice, getInvoice, getInvoices, getTotalCount } =require('../controllers/invoices.js');

const router = express.Router()

router.get('/count', getTotalCount) //use to generate invoice serial number
router.get('/:id', getInvoice)
router.get('/', getInvoices)
router.post('/', createInvoice)
router.patch('/:id', updateInvoice)
router.delete('/:id', deleteInvoice)


module.exports = router;