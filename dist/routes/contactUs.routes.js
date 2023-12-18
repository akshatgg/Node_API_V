"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var contactUs_controller_1 = require("../controllers/contactUs.controller");
var contactUsRouter = (0, express_1.Router)();
contactUsRouter.post('/create', verify_token_1.default, contactUs_controller_1.ContactUsController.contactUs);
contactUsRouter.get('/getAll', verify_token_1.default, contactUs_controller_1.ContactUsController.findAllContactUs);
contactUsRouter.get('/getOne/:id', verify_token_1.default, contactUs_controller_1.ContactUsController.getById);
contactUsRouter.delete('/delete/:id', verify_token_1.default, contactUs_controller_1.ContactUsController.delete);
exports.default = contactUsRouter;
//# sourceMappingURL=contactUs.routes.js.map