"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var loan_controller_1 = __importDefault(require("../controllers/loan.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var admin_check_1 = __importDefault(require("../middlewares/admin-check"));
var loanRouter = (0, express_1.Router)();
loanRouter.post('/applications', verify_token_1.default, body_validator_1.default, loan_controller_1.default.applyForLoan);
loanRouter.get('/applications', verify_token_1.default, loan_controller_1.default.getAppliedLoans);
loanRouter.get('/applications/:id', verify_token_1.default, loan_controller_1.default.getAppliedLoanById);
loanRouter.post('/loans', verify_token_1.default, admin_check_1.default, body_validator_1.default, loan_controller_1.default.createLoan);
loanRouter.get('/loans', verify_token_1.default, admin_check_1.default, loan_controller_1.default.getAllLoans);
loanRouter.get('/loans/:id', verify_token_1.default, admin_check_1.default, loan_controller_1.default.getLoanById);
exports.default = loanRouter;
//# sourceMappingURL=loan.routes.js.map