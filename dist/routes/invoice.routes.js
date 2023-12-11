"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var invoice_controller_1 = __importDefault(require("../controllers/invoice.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var invoiceRouter = (0, express_1.Router)();
invoiceRouter.get('/summary', verify_token_1.default, invoice_controller_1.default.summary);
// Routes for invoices
invoiceRouter.get('/invoices/:id', verify_token_1.default, invoice_controller_1.default.getById);
invoiceRouter.get('/invoices', verify_token_1.default, invoice_controller_1.default.getAll);
invoiceRouter.post('/invoices', verify_token_1.default, invoice_controller_1.default.create);
invoiceRouter.put('/invoices/:id', verify_token_1.default, invoice_controller_1.default.update);
invoiceRouter.delete('/invoices/:id', verify_token_1.default, invoice_controller_1.default.delete);
// Routes for parties
invoiceRouter.get('/parties', verify_token_1.default, invoice_controller_1.default.getAllParties);
invoiceRouter.get('/parties/:id', verify_token_1.default, invoice_controller_1.default.getPartyById);
invoiceRouter.post('/parties', verify_token_1.default, invoice_controller_1.default.createParty);
invoiceRouter.delete('/parties/:id', verify_token_1.default, invoice_controller_1.default.deleteParty);
// Routes for items
invoiceRouter.get('/items', verify_token_1.default, invoice_controller_1.default.getAllItems);
invoiceRouter.get('/items/:id', verify_token_1.default, invoice_controller_1.default.getItemById);
invoiceRouter.post('/items', verify_token_1.default, invoice_controller_1.default.createItem);
invoiceRouter.delete('/items/:id', verify_token_1.default, invoice_controller_1.default.deleteItem);
exports.default = invoiceRouter;
//# sourceMappingURL=invoice.routes.js.map