"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAbout = void 0;
var express_1 = require("express");
var file_upload_1 = require("../config/file-upload");
var about_controller_1 = require("../controllers/about.controller");
exports.registerAbout = (0, express_1.Router)();
exports.registerAbout.post('/register', file_upload_1.upload.single('image'), about_controller_1.AboutController.registerTeam);
exports.registerAbout.get('/getAll', about_controller_1.AboutController.findAllTeam);
exports.registerAbout.get('/getOne/:id', about_controller_1.AboutController.getTeamById);
exports.registerAbout.delete('/delete/:id', about_controller_1.AboutController.delete);
//# sourceMappingURL=about.routes.js.map