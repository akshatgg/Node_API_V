"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var billrecieve_controller_1 = __importDefault(require("../controllers/billrecieve.controller"));
var billRecieveRouter = (0, express_1.Router)();
// create library
billRecieveRouter.post('/create', billrecieve_controller_1.default.createBillRecieve);
//find all library
billRecieveRouter.get('/getAll', billrecieve_controller_1.default.findAllBillRecieve);
// find library by id
billRecieveRouter.get('/getOne/:id', billrecieve_controller_1.default.findOneBillRecieve);
//  library update by id
billRecieveRouter.put('/update/:id', billrecieve_controller_1.default.updateBill);
// library delete by id
billRecieveRouter.delete('/delete/:id', billrecieve_controller_1.default.deleteBill);
exports.default = billRecieveRouter;
//# sourceMappingURL=billrecieve.routes.js.map