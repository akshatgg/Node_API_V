"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ocr_controller_1 = __importDefault(require("../controllers/ocr.controller"));
var multer_middleware_1 = require("../middlewares/multer.middleware");
var ocrRouter = (0, express_1.Router)();
ocrRouter.post('/pan', multer_middleware_1.upload.single("file"), ocr_controller_1.default.getpandata);
// ocrRouter.get('/pan/:id', OcrController.Getuploadpandata);
exports.default = ocrRouter;
//# sourceMappingURL=ocr.routes.js.map