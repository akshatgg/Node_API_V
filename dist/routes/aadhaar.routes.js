"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var query_validator_1 = __importDefault(require("../middlewares/query-validator"));
var aadhaar_controller_1 = __importDefault(require("../controllers/sandbox/aadhaar.controller"));
var body_validator_1 = __importDefault(require("../middlewares/body-validator"));
var aadhaarRouter = (0, express_1.Router)();
aadhaarRouter.get('/verify', verify_token_1.default, (0, query_validator_1.default)(['aadhaar_number']), aadhaar_controller_1.default.verifyAadhaar);
aadhaarRouter.post('/aadhaar-generate-otp', verify_token_1.default, body_validator_1.default, aadhaar_controller_1.default.aadharGenerateOtp);
aadhaarRouter.post('/aadhaar-verify-otp', verify_token_1.default, body_validator_1.default, aadhaar_controller_1.default.aadhaarVerifyOtp);
exports.default = aadhaarRouter;
//# sourceMappingURL=aadhaar.routes.js.map