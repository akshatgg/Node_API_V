"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var calculators_controller_1 = __importDefault(require("../controllers/sandbox/calculators.controller"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var calculatorRoutes = (0, express_1.Router)();
calculatorRoutes.post('/income-tax/new-regime', verify_token_1.default, body_validator_1.default, calculators_controller_1.default.incomeTaxNewRegime);
calculatorRoutes.post('/income-tax/old-regime', verify_token_1.default, body_validator_1.default, calculators_controller_1.default.incomeTaxOldRegime);
calculatorRoutes.post('/advance-income-tax/old-regime', verify_token_1.default, body_validator_1.default, calculators_controller_1.default.advanceIncomeTaxOldRegime);
calculatorRoutes.post('/advance-income-tax/new-regime', verify_token_1.default, body_validator_1.default, calculators_controller_1.default.advanceIncomeTaxNewRegime);
exports.default = calculatorRoutes;
//# sourceMappingURL=calculators.routes.js.map