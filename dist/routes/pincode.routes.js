"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pincode_controller_1 = __importDefault(require("../controllers/pincode.controller"));
var query_validator_1 = __importDefault(require("../middlewares/query-validator"));
var pincodeRouter = (0, express_1.Router)();
pincodeRouter.get('/info-by-pincode', (0, query_validator_1.default)(['pincode']), pincode_controller_1.default.getInfoByPincode);
pincodeRouter.get('/pincode-by-city', (0, query_validator_1.default)(['city']), pincode_controller_1.default.getPincodeByCity);
exports.default = pincodeRouter;
//# sourceMappingURL=pincode.routes.js.map