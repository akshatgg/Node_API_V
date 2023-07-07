"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var billpayable_controller_1 = __importDefault(require("../controllers/billpayable.controller"));
var billPayableRouter = (0, express_1.Router)();
// create library
billPayableRouter.post('/create', billpayable_controller_1.default.createBillPayable);
//find all library
billPayableRouter.get('/getAll', billpayable_controller_1.default.findAllBillPayable);
// find library by id
billPayableRouter.get('/getOne/:id', billpayable_controller_1.default.findOneBillPayable);
//  library update by id
billPayableRouter.put('/update/:id', billpayable_controller_1.default.updateBill);
// library delete by id
billPayableRouter.delete('/delete/:id', billpayable_controller_1.default.deleteBill);
exports.default = billPayableRouter;
//# sourceMappingURL=billpayable.routes.js.map