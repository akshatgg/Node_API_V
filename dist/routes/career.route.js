"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var career_controller_1 = __importDefault(require("../controllers/career.controller"));
var file_upload_1 = require("../config/file-upload");
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var careerRouter = (0, express_1.Router)();
//create career
careerRouter.post('/create', file_upload_1.upload.single('cv'), verify_token_1.default, career_controller_1.default.createCareer);
//find all career
careerRouter.get('/findAll', verify_token_1.default, career_controller_1.default.findAllCareer);
// find library by id
careerRouter.get('/findOne/:id', verify_token_1.default, career_controller_1.default.findOneCareer);
// delete career
careerRouter.delete('/delete/:id', verify_token_1.default, career_controller_1.default.deleteCareer);
careerRouter.get('/getCv/:id', verify_token_1.default, career_controller_1.default.getCVByCareerId);
exports.default = careerRouter;
//# sourceMappingURL=career.route.js.map