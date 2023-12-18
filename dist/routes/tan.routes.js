"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tan_controller_1 = __importDefault(require("../controllers/sandbox/tan.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var tanRouter = (0, express_1.Router)();
tanRouter.get('/search', verify_token_1.default, tan_controller_1.default.searchByTanNo);
exports.default = tanRouter;
//# sourceMappingURL=tan.routes.js.map