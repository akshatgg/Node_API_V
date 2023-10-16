"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payment_controller_1 = __importDefault(require("../controllers/payment/payment.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var paymentRouter = (0, express_1.Router)();
paymentRouter.post('/initiate_payment', verify_token_1.default, payment_controller_1.default.initiatePayment);
paymentRouter.post('/transaction', verify_token_1.default, payment_controller_1.default.transaction);
paymentRouter.post('/transaction_date', verify_token_1.default, payment_controller_1.default.transactionDate);
paymentRouter.post('/payout', verify_token_1.default, payment_controller_1.default.payout);
paymentRouter.post('/refund', verify_token_1.default, payment_controller_1.default.refund);
paymentRouter.post('/response', verify_token_1.default, payment_controller_1.default.response);
exports.default = paymentRouter;
//# sourceMappingURL=payment.routes.js.map