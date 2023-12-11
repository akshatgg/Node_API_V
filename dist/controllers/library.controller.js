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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
// create library
var LibraryController = /** @class */ (function () {
    function LibraryController() {
    }
    LibraryController.createLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pan, section, sub_section, subject, ao_order, itat_no, rsa_no, bench, appeal_no, appellant, respondent, appeal_type, appeal_filed_by, order_result, tribunal_order_date, assessment_year, judgment, conclusion, download, upload, Library, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, pan = _a.pan, section = _a.section, sub_section = _a.sub_section, subject = _a.subject, ao_order = _a.ao_order, itat_no = _a.itat_no, rsa_no = _a.rsa_no, bench = _a.bench, appeal_no = _a.appeal_no, appellant = _a.appellant, respondent = _a.respondent, appeal_type = _a.appeal_type, appeal_filed_by = _a.appeal_filed_by, order_result = _a.order_result, tribunal_order_date = _a.tribunal_order_date, assessment_year = _a.assessment_year, judgment = _a.judgment, conclusion = _a.conclusion, download = _a.download, upload = _a.upload;
                        return [4 /*yield*/, prisma.library.create({
                                data: {
                                    pan: pan,
                                    section: section,
                                    sub_section: sub_section,
                                    subject: subject,
                                    ao_order: ao_order,
                                    itat_no: itat_no,
                                    rsa_no: rsa_no,
                                    bench: bench,
                                    appeal_no: appeal_no,
                                    appellant: appellant,
                                    respondent: respondent,
                                    appeal_type: appeal_type,
                                    appeal_filed_by: appeal_filed_by,
                                    order_result: order_result,
                                    tribunal_order_date: tribunal_order_date,
                                    assessment_year: assessment_year,
                                    judgment: judgment,
                                    conclusion: conclusion,
                                    download: download,
                                    upload: upload
                                },
                            })];
                    case 1:
                        Library = _b.sent();
                        res.status(201).json({ message: 'Library added successfully', result: Library });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        //console.log(error)
                        res.status(500).json({ success: false, message: 'Internal server error', errors: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // find All library
    LibraryController.findAllLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allLibrary, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.library.findMany({})];
                    case 1:
                        allLibrary = _a.sent();
                        res.status(200).json({ success: true, allLibrary: allLibrary });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal server error', errors: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get library by id
    LibraryController.findOneLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, library, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, prisma.library.findUnique({
                                where: {
                                    id: id,
                                },
                            })];
                    case 1:
                        library = _a.sent();
                        if (!library) {
                            res.status(404).json({ success: false, message: 'library not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json(library);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //profile update by id
    LibraryController.updateLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, pan, section, sub_section, subject, ao_order, itat_no, rsa_no, bench, appeal_no, appellant, respondent, appeal_type, appeal_filed_by, order_result, tribunal_order_date, assessment_year, judgment, conclusion, download, upload, updatedLibrary, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = parseInt(req.params.id);
                        _a = req.body, pan = _a.pan, section = _a.section, sub_section = _a.sub_section, subject = _a.subject, ao_order = _a.ao_order, itat_no = _a.itat_no, rsa_no = _a.rsa_no, bench = _a.bench, appeal_no = _a.appeal_no, appellant = _a.appellant, respondent = _a.respondent, appeal_type = _a.appeal_type, appeal_filed_by = _a.appeal_filed_by, order_result = _a.order_result, tribunal_order_date = _a.tribunal_order_date, assessment_year = _a.assessment_year, judgment = _a.judgment, conclusion = _a.conclusion, download = _a.download, upload = _a.upload;
                        return [4 /*yield*/, prisma.library.update({
                                where: { id: id },
                                data: {
                                    pan: pan,
                                    section: section,
                                    sub_section: sub_section,
                                    subject: subject,
                                    ao_order: ao_order,
                                    itat_no: itat_no,
                                    rsa_no: rsa_no,
                                    bench: bench,
                                    appeal_no: appeal_no,
                                    appellant: appellant,
                                    respondent: respondent,
                                    appeal_type: appeal_type,
                                    appeal_filed_by: appeal_filed_by,
                                    order_result: order_result,
                                    tribunal_order_date: tribunal_order_date,
                                    assessment_year: assessment_year,
                                    judgment: judgment,
                                    conclusion: conclusion,
                                    download: download,
                                    upload: upload
                                }
                            })];
                    case 1:
                        updatedLibrary = _b.sent();
                        if (!updatedLibrary) {
                            res.status(404).json({ sucess: false, message: 'library not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json({ sucess: true, updatedLibrary: updatedLibrary });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error(error_4);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete library by id
    LibraryController.deleteLibrary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var Id, deletedLibrary, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        Id = parseInt(req.params.id);
                        return [4 /*yield*/, prisma.library.delete({ where: { id: Id } })];
                    case 1:
                        deletedLibrary = _a.sent();
                        if (!deletedLibrary) {
                            res.status(404).json({ success: false, message: 'library not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json({ success: true, deletedLibrary: deletedLibrary });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LibraryController;
}());
exports.default = LibraryController;
//# sourceMappingURL=library.controller.js.map