"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var library_controller_1 = __importDefault(require("../controllers/library.controller"));
var libraryRouter = (0, express_1.Router)();
// create library
libraryRouter.post('/create', library_controller_1.default.createLibrary);
//find all library
libraryRouter.get('/getAll', library_controller_1.default.findAllLibrary);
// find library by id
libraryRouter.get('/getOne/:id', library_controller_1.default.findOneLibrary);
//  library update by id
libraryRouter.put('/update/:id', library_controller_1.default.updateLibrary);
// library delete by id
libraryRouter.delete('/delete/:id', library_controller_1.default.deleteLibrary);
exports.default = libraryRouter;
//# sourceMappingURL=library.routes.js.map