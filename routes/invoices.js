const express = require('express');
const {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    getInvoicesByUser,
    getTotalCount,
} = require('../controllers/invoices');

const {
    getParties,
    getPartyById,
    getItems,
} = require('../controllers/invoice.controller');

const router = express.Router();

router.get('/count', getTotalCount); //use to generate invoice serial number
router.get('/:id', getInvoice);
router.get('/', getInvoicesByUser);
router.post('/', createInvoice);
router.patch('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

router.get('/parties', getParties);
router.get('/party/:id', getPartyById);
router.get('/items', getItems);
router.get('/item/:id', getPartyById);

module.exports = router;
