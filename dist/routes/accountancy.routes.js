"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var account_controller_1 = __importDefault(require("../controllers/accountancy/account.controller"));
var accountancyRouter = (0, express_1.Router)();
accountancyRouter.get('/accounts/', verify_token_1.default, account_controller_1.default.getAccountsByUser);
accountancyRouter.get('/accounts/account/:id', verify_token_1.default, account_controller_1.default.getAccountById);
accountancyRouter.post('/accounts/create', verify_token_1.default, account_controller_1.default.createAccount);
accountancyRouter.put('/accounts/update/:id', verify_token_1.default, account_controller_1.default.createAccount);
accountancyRouter.delete('/accounts/delete/:id', verify_token_1.default, account_controller_1.default.deleteAccount);
exports.default = accountancyRouter;
//# sourceMappingURL=accountancy.routes.js.map