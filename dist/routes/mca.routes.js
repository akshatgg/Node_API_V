"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mca_controller_1 = __importDefault(require("../controllers/sandbox/mca.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var query_validator_1 = __importDefault(require("../middlewares/query-validator"));
var mcaRouter = (0, express_1.Router)();
mcaRouter.get('/company-details', verify_token_1.default, mca_controller_1.default.getCompanyByCIN);
mcaRouter.get('/director-details', verify_token_1.default, (0, query_validator_1.default)(['din']), mca_controller_1.default.getDirectorByDIN);
exports.default = mcaRouter;
//# sourceMappingURL=mca.routes.js.map