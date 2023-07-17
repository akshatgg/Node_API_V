"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var zod_1 = require("zod");
var client_1 = require("@prisma/client");
var path_1 = require("path");
var process_1 = require("process");
var AttachDocumentBodySchema = zod_1.z.object({
    documents: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        shortName: zod_1.z.string(),
        mandatory: zod_1.z.boolean().default(false),
        type: zod_1.z.nativeEnum(client_1.DocumentType),
        description: zod_1.z.string().optional(),
    })),
    applicationId: zod_1.z.string(),
});
var currentDir = (0, process_1.cwd)();
var DocumentController = /** @class */ (function () {
    function DocumentController() {
    }
    DocumentController.uploadDocuments = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId_1, files, documents, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId_1 = req.user.id;
                        files = req.files;
                        if (!files) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'No files to upload.' })];
                        }
                        return [4 /*yield*/, __1.prisma.$transaction(files.map(function (file) {
                                var fileName = file.path.split('/').pop();
                                return __1.prisma.uploadedDocument.create({
                                    data: {
                                        userId: userId_1,
                                        fileName: fileName,
                                    }
                                });
                            }))];
                    case 1:
                        documents = _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, message: "".concat(files.length, " Documents uploaded"), documents: documents })];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.attachDocuments = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, documents, applicationId_1, application, attachedDocuments, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        userId = req.user.id;
                        _a = AttachDocumentBodySchema.parse(req.body), documents = _a.documents, applicationId_1 = _a.applicationId;
                        if (!documents.length || !applicationId_1) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Document IDs and Application ID are required' })];
                        }
                        return [4 /*yield*/, __1.prisma.loanApplication.findUnique({
                                where: {
                                    id: applicationId_1
                                }
                            })];
                    case 1:
                        application = _b.sent();
                        if (!application || application.userId !== userId) {
                            return [2 /*return*/, res.status(200).json({ success: false, message: 'Application not found.' })];
                        }
                        return [4 /*yield*/, __1.prisma.loanDocument.createMany({
                                data: documents,
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, __1.prisma.$transaction(documents.map(function (cur) {
                                return __1.prisma.uploadedDocument.update({
                                    where: { id: cur.id },
                                    data: {
                                        applicationId: applicationId_1
                                    }
                                });
                            }))];
                    case 3:
                        attachedDocuments = _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, message: 'Documents attached', attachedDocuments: attachedDocuments, })];
                    case 4:
                        e_2 = _b.sent();
                        console.log(e_2);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.deleteDocument = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, documentId, doc, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userId = req.user.id;
                        documentId = req.body.documentId;
                        if (!documentId) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Document ID is required' })];
                        }
                        return [4 /*yield*/, __1.prisma.uploadedDocument.findUnique({
                                where: {
                                    id: documentId
                                }
                            })];
                    case 1:
                        doc = _a.sent();
                        if (!doc || doc.userId !== userId) {
                            return [2 /*return*/, res.status(200).json({ success: false, message: 'Document not found.' })];
                        }
                        return [4 /*yield*/, __1.prisma.uploadedDocument.delete({
                                where: {
                                    id: documentId,
                                },
                            })];
                    case 2:
                        _a.sent();
                        if (!doc.applicationId) return [3 /*break*/, 4];
                        return [4 /*yield*/, __1.prisma.loanApplication.delete({
                                where: {
                                    id: doc.applicationId,
                                },
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, res.status(200).json({ success: true, message: 'Document deleted', })];
                    case 5:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.getDocumentsByApplication = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationId, userId, isAdmin, documents, documents, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        applicationId = req.body.applicationId;
                        if (!applicationId) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Application ID is required' })];
                        }
                        userId = req.user.id;
                        isAdmin = req.isAdmin;
                        if (!isAdmin) return [3 /*break*/, 2];
                        return [4 /*yield*/, __1.prisma.uploadedDocument.findMany({
                                where: { applicationId: applicationId },
                                include: {
                                    docs: true,
                                },
                            })];
                    case 1:
                        documents = _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, documents: documents })];
                    case 2: return [4 /*yield*/, __1.prisma.uploadedDocument.findMany({
                            where: { applicationId: applicationId, userId: userId },
                            include: {
                                docs: true,
                            },
                        })];
                    case 3:
                        documents = _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, documents: documents })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.getRawDocumentById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, doc, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Document ID is required' })];
                        }
                        userId = req.user.id;
                        return [4 /*yield*/, __1.prisma.uploadedDocument.findFirst({
                                where: {
                                    id: id,
                                    userId: userId,
                                }
                            })];
                    case 1:
                        doc = _a.sent();
                        if (!doc) {
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Document not found' })];
                        }
                        return [2 /*return*/, res.sendFile((0, path_1.join)(currentDir, 'uploads', doc.fileName))];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DocumentController;
}());
exports.default = DocumentController;
//# sourceMappingURL=document.controller.js.map