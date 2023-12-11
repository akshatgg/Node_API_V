"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var registerStartup_controller_1 = require("../controllers/registerStartup.controller");
var file_upload_1 = require("../config/file-upload");
var registerStartupRouter = (0, express_1.Router)();
registerStartupRouter.post('/register', file_upload_1.upload.single('image'), verify_token_1.default, registerStartup_controller_1.RegisterStartupController.RegisterStartup);
registerStartupRouter.get('/getAll', verify_token_1.default, registerStartup_controller_1.RegisterStartupController.findAllStartup);
registerStartupRouter.get('/getOne/:id', verify_token_1.default, registerStartup_controller_1.RegisterStartupController.getById);
registerStartupRouter.delete('/delete/:id', verify_token_1.default, registerStartup_controller_1.RegisterStartupController.delete);
exports.default = registerStartupRouter;
//# sourceMappingURL=registerStartup,routes.js.map