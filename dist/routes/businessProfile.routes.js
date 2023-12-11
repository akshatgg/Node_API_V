"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var businessProfile_controller_1 = __importDefault(require("../controllers/businessProfile.controller"));
var admin_check_1 = __importDefault(require("../middlewares/admin-check"));
var businessProfileRouter = (0, express_1.Router)();
businessProfileRouter.post('/', verify_token_1.default, businessProfile_controller_1.default.update);
businessProfileRouter.get('/profile', verify_token_1.default, businessProfile_controller_1.default.getProfile);
businessProfileRouter.get('/profile/all', verify_token_1.default, admin_check_1.default, businessProfile_controller_1.default.getAllProfiles);
businessProfileRouter.get('/profile/:id', verify_token_1.default, admin_check_1.default, businessProfile_controller_1.default.getProfileById);
exports.default = businessProfileRouter;
//# sourceMappingURL=businessProfile.routes.js.map