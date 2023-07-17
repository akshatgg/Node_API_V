"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var insurance_controller_1 = __importDefault(require("../controllers/insurance.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var router = (0, express_1.Router)();
router.post("/apply", verify_token_1.default, body_validator_1.default, insurance_controller_1.default.applyForInsurance);
router.get("/:id", verify_token_1.default, insurance_controller_1.default.getInsuranceById);
router.get("/", verify_token_1.default, insurance_controller_1.default.getInsuranceApplications);
router.get("/user/:id", verify_token_1.default, insurance_controller_1.default.getInsuranceApplicationsByUser);
exports.default = router;
//# sourceMappingURL=insurance.routes.js.map