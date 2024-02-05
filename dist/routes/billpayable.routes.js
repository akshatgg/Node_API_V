"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var accounts_controller_1 = require("../controllers/accounts.controller");
var admin_check_1 = __importDefault(require("../middlewares/admin-check"));
var billpayablerouter = (0, express_1.Router)();
billpayablerouter.post("/create", verify_token_1.default, admin_check_1.default, accounts_controller_1.Accountscontroller.Payablebill);
billpayablerouter.get("/getOne/:id", verify_token_1.default, accounts_controller_1.Accountscontroller.getonepayablebill);
billpayablerouter.get("/getAll", verify_token_1.default, admin_check_1.default, accounts_controller_1.Accountscontroller.getallpayablebill);
billpayablerouter.post("/update/:id", verify_token_1.default, admin_check_1.default, accounts_controller_1.Accountscontroller.updatepayablebill);
billpayablerouter.delete("/delete/:id", verify_token_1.default, admin_check_1.default, accounts_controller_1.Accountscontroller.deletepayablebill);
exports.default = billpayablerouter;
//# sourceMappingURL=billpayable.routes.js.map