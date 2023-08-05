"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var account_ledger_controller_1 = __importDefault(require("../controllers/accountancyManagement/account.ledger.controller"));
var account_journal_controller_1 = __importDefault(require("../controllers/accountancyManagement/account.journal.controller"));
var account_payment_controller_1 = __importDefault(require("../controllers/accountancyManagement/account.payment.controller"));
var accountancyRouter = (0, express_1.Router)();
// ledger
accountancyRouter.post('/create', verify_token_1.default, account_ledger_controller_1.default.createLadger);
accountancyRouter.get('/getAll', verify_token_1.default, account_ledger_controller_1.default.findAllLedger);
accountancyRouter.get('/getOne/:id', verify_token_1.default, account_ledger_controller_1.default.getById);
accountancyRouter.put('/update/:id', verify_token_1.default, account_ledger_controller_1.default.update);
accountancyRouter.delete('/delete/:id', verify_token_1.default, account_ledger_controller_1.default.delete);
// journal
accountancyRouter.post('/createJournal', verify_token_1.default, account_journal_controller_1.default.createJournal);
accountancyRouter.get('/getAllJournal', verify_token_1.default, account_journal_controller_1.default.findAllJournal);
accountancyRouter.get('/getOneJournal/:id', verify_token_1.default, account_journal_controller_1.default.getJournalById);
accountancyRouter.put('/updatejournal/:id', verify_token_1.default, account_journal_controller_1.default.updateJournal);
accountancyRouter.delete('/deletejournal/:id', verify_token_1.default, account_journal_controller_1.default.deleteJournal);
//payment
accountancyRouter.post('/createPayment', verify_token_1.default, account_payment_controller_1.default.createPayment);
accountancyRouter.get('/getAllPayment', verify_token_1.default, account_payment_controller_1.default.findAllPayment);
accountancyRouter.get('/getOnePayment/:id', verify_token_1.default, account_payment_controller_1.default.getPaymentById);
accountancyRouter.put('/updatePayment/:id', verify_token_1.default, account_payment_controller_1.default.updatePayment);
accountancyRouter.delete('/deletePayment/:id', verify_token_1.default, account_payment_controller_1.default.deletePayment);
exports.default = accountancyRouter;
//# sourceMappingURL=accountancys.routes.js.map