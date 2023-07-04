"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var gst_controller_1 = __importDefault(require("../controllers/sandbox/gst.controller"));
var gstRouter = (0, express_1.Router)();
gstRouter.get('/search-by-gstin', gst_controller_1.default.searchByGSTIN);
exports.default = gstRouter;
//# sourceMappingURL=gstin.routes.js.map