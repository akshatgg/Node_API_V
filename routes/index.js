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

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Server is running! 🏃‍'});
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

router.get('*', (req, res, next) => {
    return next(ApiError.notFound("endpoint not found"))
});

router.post('*', (req, res, next) => {
    return next(ApiError.notFound("endpoint not found"))
});

module.exports = router;
