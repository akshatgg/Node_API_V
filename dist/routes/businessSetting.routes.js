"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BusinessSetting_1 = __importDefault(require("../controllers/BusinessSetting"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var businessSettingRouter = (0, express_1.Router)();
businessSettingRouter.post('/create', verify_token_1.default, BusinessSetting_1.default.createBusiness);
businessSettingRouter.get('/getAll', verify_token_1.default, BusinessSetting_1.default.findAllSetting);
businessSettingRouter.get('/getOne/:id', verify_token_1.default, BusinessSetting_1.default.getById);
businessSettingRouter.put('/update/:id', verify_token_1.default, BusinessSetting_1.default.update);
businessSettingRouter.delete('/delete/:id', verify_token_1.default, BusinessSetting_1.default.delete);
exports.default = businessSettingRouter;
//# sourceMappingURL=businessSetting.routes.js.map