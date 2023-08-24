"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var admin_check_1 = __importDefault(require("../middlewares/admin-check"));
var userRouter = (0, express_1.Router)();
userRouter.get('/profile', verify_token_1.default, user_controller_1.default.getOwnProfile);
userRouter.get('/profile/:id', verify_token_1.default, user_controller_1.default.getUserById);
userRouter.get('/get-all-users', verify_token_1.default, admin_check_1.default, user_controller_1.default.getAllUsers);
userRouter.post('/sign-up', user_controller_1.default.signUp);
userRouter.post('/login', user_controller_1.default.login);
userRouter.post('/forgot-password', user_controller_1.default.forgotPassword);
userRouter.post('/verify', user_controller_1.default.verifyOtp);
userRouter.post('/send-otp', verify_token_1.default, user_controller_1.default.sendVerificationOtp);
userRouter.post('/change-password', verify_token_1.default, user_controller_1.default.changePassword);
userRouter.post('/update', verify_token_1.default, user_controller_1.default.updateProfile);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map