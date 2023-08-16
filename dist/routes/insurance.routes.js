"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var insurance_controller_1 = __importDefault(require("../controllers/insurance.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var insourancerouter = (0, express_1.Router)();
insourancerouter.post("/apply", verify_token_1.default, body_validator_1.default, insurance_controller_1.default.applyForInsurance);
insourancerouter.get("/getOne/:id", verify_token_1.default, insurance_controller_1.default.getInsuranceById);
insourancerouter.get("/getAll", verify_token_1.default, insurance_controller_1.default.getInsuranceApplications);
insourancerouter.get("/user/:id", verify_token_1.default, insurance_controller_1.default.getInsuranceApplicationsByUser);
insourancerouter.delete("/delete/:id", verify_token_1.default, insurance_controller_1.default.deleteInsourance);
exports.default = insourancerouter;
//# sourceMappingURL=insurance.routes.js.map