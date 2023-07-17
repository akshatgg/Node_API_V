"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var file_upload_1 = require("../config/file-upload");
var document_controller_1 = __importDefault(require("../controllers/document.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var documentRouter = (0, express_1.Router)();
documentRouter.post('/upload', verify_token_1.default, file_upload_1.upload.array('file', 20), document_controller_1.default.uploadDocuments);
documentRouter.get('/document/raw/:id', verify_token_1.default, document_controller_1.default.getRawDocumentById);
exports.default = documentRouter;
//# sourceMappingURL=document.routes.js.map