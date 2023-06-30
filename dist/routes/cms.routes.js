"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var cms_controller_1 = __importDefault(require("../controllers/cms.controller"));
var cmsRouter = (0, express_1.Router)();
cmsRouter.get('/homescreen', cms_controller_1.default.getHomeScreen);
cmsRouter.get('/total-users', cms_controller_1.default.getUserCount);
cmsRouter.post('/main-heading', verify_token_1.default, cms_controller_1.default.updateMainHeading);
cmsRouter.post('/sub-heading', verify_token_1.default, cms_controller_1.default.updateSubHeading);
cmsRouter.post('/navcards', verify_token_1.default, cms_controller_1.default.updateNavCards);
cmsRouter.post('/button', verify_token_1.default, cms_controller_1.default.updateButton);
exports.default = cmsRouter;
//# sourceMappingURL=cms.routes.js.map