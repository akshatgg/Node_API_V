"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = __importDefault(require("./user.routes"));
var businessProfile_routes_1 = __importDefault(require("./businessProfile.routes"));
var invoice_routes_1 = __importDefault(require("./invoice.routes"));
var pincode_routes_1 = __importDefault(require("./pincode.routes"));
var cms_routes_1 = __importDefault(require("./cms.routes"));
var postOffice_routes_1 = __importDefault(require("./postOffice.routes"));
var router = (0, express_1.Router)();
router.use('/user', user_routes_1.default);
router.use('/business', businessProfile_routes_1.default);
router.use('/invoice', invoice_routes_1.default);
router.use('/cms', cms_routes_1.default);
router.use('/pincode', pincode_routes_1.default);
router.use('/postOffice', postOffice_routes_1.default);
router.get('/', function (req, res) {
    return res.send({ message: 'Up and running' });
});
var handlePageNotFound = function (req, res) {
    return res.status(404).send({ message: 'Endpoint not found' });
};
router.get('*', handlePageNotFound);
router.post('*', handlePageNotFound);
exports.default = router;
//# sourceMappingURL=index.js.map