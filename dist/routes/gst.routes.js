"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var gst_controller_1 = __importDefault(require("../controllers/sandbox/gst.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var gstRouter = (0, express_1.Router)();
gstRouter.get('/search/gstin', verify_token_1.default, gst_controller_1.default.searchByGSTIN);
gstRouter.get('/search/gstin-by-pan', verify_token_1.default, gst_controller_1.default.searchGSTINNumberByPan);
gstRouter.post('/return/track', verify_token_1.default, body_validator_1.default, gst_controller_1.default.trackGSTReturn);
gstRouter.post('/tax-payer/registration', verify_token_1.default, body_validator_1.default, gst_controller_1.default.registerForGST);
gstRouter.post('/tax-payer/generate-otp', verify_token_1.default, body_validator_1.default, gst_controller_1.default.generateOTP);
gstRouter.post('/tax-payer/verify-otp', verify_token_1.default, body_validator_1.default, gst_controller_1.default.verifyOTP);
gstRouter.post('/tax-payer/file/proceed', verify_token_1.default, body_validator_1.default, gst_controller_1.default.proceedToFileGstr);
exports.default = gstRouter;
//# sourceMappingURL=gst.routes.js.map