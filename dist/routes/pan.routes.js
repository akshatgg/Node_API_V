"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var panAadhaar_controller_1 = __importDefault(require("../controllers/sandbox/panAadhaar.controller"));
var pan_controller_1 = __importDefault(require("../controllers/sandbox/pan.controller"));
var panRouter = (0, express_1.Router)();
panRouter.get('/pan-aadhaar-link-status', verify_token_1.default, panAadhaar_controller_1.default.checkLinkStatus);
panRouter.get('/get-pan-details', verify_token_1.default, pan_controller_1.default.getAdvancePanDetails);
exports.default = panRouter;
//# sourceMappingURL=pan.routes.js.map