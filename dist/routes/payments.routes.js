"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payments_controller_1 = __importDefault(require("../controllers/payments.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var paymentsRouter = (0, express_1.Router)();
paymentsRouter.post('/', verify_token_1.default, payments_controller_1.default.createPayment);
paymentsRouter.get('/', verify_token_1.default, payments_controller_1.default.getPayments);
paymentsRouter.get('/:id', verify_token_1.default, payments_controller_1.default.getPaymentById);
paymentsRouter.put('/:id', verify_token_1.default, payments_controller_1.default.updatePayment);
paymentsRouter.delete('/:id', verify_token_1.default, payments_controller_1.default.deletePayment);
exports.default = paymentsRouter;
//# sourceMappingURL=payments.routes.js.map