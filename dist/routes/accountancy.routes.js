"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var accountancy_controller_1 = require("../controllers/accountancy.controller");
var accountancyRouter = (0, express_1.Router)();
var ledgerRouter = (0, express_1.Router)();
ledgerRouter.post('/create', verify_token_1.default, body_validator_1.default, accountancy_controller_1.LedgerController.createLedger);
ledgerRouter.get('/id/:ledgerId', verify_token_1.default, accountancy_controller_1.LedgerController.getLedgerById);
ledgerRouter.get('/party/:partyId', verify_token_1.default, accountancy_controller_1.LedgerController.getLedgerByPartyId);
ledgerRouter.get('/all', verify_token_1.default, accountancy_controller_1.LedgerController.getLedgers);
accountancyRouter.use('/ledger', ledgerRouter);
exports.default = accountancyRouter;
//# sourceMappingURL=accountancy.routes.js.map