const express = require('express');
const router = express.Router();
const usersRouter = require("./users.route");
const mcaRouter = require("./sandbox/mca.route");
const bankRouter = require("./sandbox/bank.route");
const gspRouter = require("./sandbox/gstin.route");
const panRouter = require("./sandbox/pan.route");
const calcRouter = require("./sandbox/calculator.route");
const ApiError = require('../errors/ApiError')
const banks = require("./bank");
const pincoderoute = require("./pincode");
const postofficeroute = require("./postoffice");
const pdfroute = require("./pdf");
const hsnRouter = require("./hsn");
const clientRouter = require("./clients");
const invoice = require("./invoices");
const profileRouter = require("./profile");
// const invoiceRouter = require("./invoice.route");

router.get('/', function (req, res, next) {
    res.render('index', {title: 'APi node Server is running! 🏃‍'});
});

router.use('/users', usersRouter);
router.use('/mca', mcaRouter);
router.use('/bank', bankRouter);
router.use('/gsp', gspRouter);
router.use('/pan', panRouter);
router.use('/calculator', calcRouter);
router.use('/banks', banks);
router.use('/postoffice', postofficeroute);
router.use('/pincode', pincoderoute);
router.use('/pdf', pdfroute);
router.use('/hsn', hsnRouter);
router.use('/client', clientRouter);
router.use('/invoice', invoice);
router.use('/profile', profileRouter);


router.get('*', (req, res, next) => {
    return next(ApiError.notFound("endpoint not found"))
});

router.post('*', (req, res, next) => {
    return next(ApiError.notFound("endpoint not found"))
});

module.exports = router;
