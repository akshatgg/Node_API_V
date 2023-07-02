"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var panAadhaar_controller_1 = __importDefault(require("../controllers/sandbox/panAadhaar.controller"));
var sandboxRouter = (0, express_1.Router)();
sandboxRouter.get('/pan-aadhaar-link-status', verify_token_1.default, panAadhaar_controller_1.default.checkLinkStatus);
exports.default = sandboxRouter;
//# sourceMappingURL=sandbox.routes.js.map