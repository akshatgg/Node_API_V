"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var hsnAndSac_controller_1 = __importDefault(require("../controllers/hsnAndSac.controller"));
var HsnAndSACRouter = (0, express_1.Router)();
HsnAndSACRouter.get('/getallhsncode', hsnAndSac_controller_1.default.getallHsncode);
HsnAndSACRouter.get('/getbyhsncode', hsnAndSac_controller_1.default.getbyhsncode);
HsnAndSACRouter.get('/getallsaccodes', hsnAndSac_controller_1.default.getallSaccode);
HsnAndSACRouter.get('/getbysaccode', hsnAndSac_controller_1.default.getbysaccode);
exports.default = HsnAndSACRouter;
//# sourceMappingURL=hsnAndSac.routes.js.map