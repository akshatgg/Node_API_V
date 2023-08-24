"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var career_controller_1 = __importDefault(require("../controllers/career.controller"));
var file_upload_1 = require("../config/file-upload");
var careerRouter = (0, express_1.Router)();
//create career
careerRouter.post('/create', file_upload_1.upload.single('cv'), career_controller_1.default.createCareer);
//find all career
careerRouter.get('/findAll', career_controller_1.default.findAllCareer);
// find library by id
careerRouter.get('/findOne/:id', career_controller_1.default.findOneCareer);
// delete career
careerRouter.delete('/delete/:id', career_controller_1.default.deleteCareer);
careerRouter.get('/getCv/:id', career_controller_1.default.getCVByCareerId);
exports.default = careerRouter;
//# sourceMappingURL=career.route.js.map