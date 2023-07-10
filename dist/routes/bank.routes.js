"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var bank_controller_1 = __importDefault(require("../controllers/sandbox/bank.controller"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var query_validator_1 = __importDefault(require("../middlewares/query-validator"));
var bankRouter = (0, express_1.Router)();
bankRouter.get('/details', verify_token_1.default, (0, query_validator_1.default)(['ifsc']), bank_controller_1.default.getBankDetailsByIfsc);
bankRouter.post('/verify-account', verify_token_1.default, body_validator_1.default, bank_controller_1.default.verifyBankAccount);
exports.default = bankRouter;
//# sourceMappingURL=bank.routes.js.map