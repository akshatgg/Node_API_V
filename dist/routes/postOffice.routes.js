"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postOffice_controller_1 = __importDefault(require("../controllers/postOffice.controller"));
var query_validator_1 = __importDefault(require("../middlewares/query-validator"));
var postOfficeRouter = (0, express_1.Router)();
postOfficeRouter.get('/by-pincode', (0, query_validator_1.default)(['pincode']), postOffice_controller_1.default.getPostOfficeByPincode);
exports.default = postOfficeRouter;
//# sourceMappingURL=postOffice.routes.js.map