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
var index_1 = require("../../index");
var JournalController = /** @class */ (function () {
    function JournalController() {
    }
    JournalController.createJournal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, date, debitAmount, creditAmount, particular, currency, narration, extraDetail, gstInformation, existingUser, newJournal, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        _a = req.body, date = _a.date, debitAmount = _a.debitAmount, creditAmount = _a.creditAmount, particular = _a.particular, currency = _a.currency, narration = _a.narration, extraDetail = _a.extraDetail, gstInformation = _a.gstInformation;
                        return [4 /*yield*/, index_1.prisma.user.findUnique({ where: { id: userId } })];
                    case 1:
                        existingUser = _b.sent();
                        if (!existingUser) {
                            res.status(404).json({ error: 'User not found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.journalEntry.create({
                                data: {
                                    date: date,
                                    debitAmount: debitAmount,
                                    creditAmount: creditAmount,
                                    particular: particular,
                                    currency: currency,
                                    narration: narration,
                                    userId: userId,
                                    extraDetail: { create: extraDetail },
                                    gstInformation: { create: gstInformation },
                                },
                                include: {
                                    extraDetail: true,
                                    gstInformation: true,
                                },
                            })];
                    case 2:
                        newJournal = _b.sent();
                        res.status(201).json({ result: newJournal, message: 'Sucessfull journal created' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(500).json({ sucess: false, message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    JournalController.findAllJournal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allJournal, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.prisma.journalEntry.findMany({
                                include: {
                                    extraDetail: true,
                                    gstInformation: true,
                                },
                            })];
                    case 1:
                        allJournal = _a.sent();
                        res.status(200).json({ success: true, allJournal: allJournal });
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
    JournalController.getJournalById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, ledger, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, index_1.prisma.journalEntry.findUnique({
                                where: { id: parseInt(id) },
                                include: {
                                    extraDetail: true,
                                    gstInformation: true,
                                },
                            })];
                    case 1:
                        ledger = _a.sent();
                        if (!ledger) {
                            res.status(404).json({ sucess: false, message: 'journal not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json(ledger);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({ sucess: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    JournalController.updateJournal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, date, debitAmount, creditAmount, particular, currency, narration, extraDetail, gstInformation, updatedJournal, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, date = _a.date, debitAmount = _a.debitAmount, creditAmount = _a.creditAmount, particular = _a.particular, currency = _a.currency, narration = _a.narration, extraDetail = _a.extraDetail, gstInformation = _a.gstInformation;
                        return [4 /*yield*/, index_1.prisma.journalEntry.update({
                                where: { id: parseInt(id) },
                                data: {
                                    date: date,
                                    debitAmount: debitAmount,
                                    creditAmount: creditAmount,
                                    particular: particular,
                                    currency: currency,
                                    narration: narration,
                                    extraDetail: {
                                        upsert: extraDetail.map(function (extra) { return ({
                                            where: { id: extra.id },
                                            create: extra,
                                            update: extra,
                                        }); }),
                                    },
                                    gstInformation: {
                                        upsert: gstInformation.map(function (gst) { return ({
                                            where: { id: gst.id },
                                            create: gst,
                                            update: gst,
                                        }); }),
                                    },
                                },
                                include: {
                                    extraDetail: true,
                                    gstInformation: true,
                                },
                            })];
                    case 1:
                        updatedJournal = _b.sent();
                        res.status(200).json({ success: true, updatedJournal: updatedJournal });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    JournalController.deleteJournal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deletedJournal, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = req.params.id;
                        // Delete related ExtraDetails first
                        return [4 /*yield*/, index_1.prisma.extraDetails.deleteMany({
                                where: { extraDetailsId: parseInt(id) },
                            })];
                    case 1:
                        // Delete related ExtraDetails first
                        _a.sent();
                        return [4 /*yield*/, index_1.prisma.gstInformation.deleteMany({
                                where: { gstInformationId: parseInt(id) },
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, index_1.prisma.journalEntry.delete({
                                where: { id: parseInt(id) },
                                include: {
                                    extraDetail: true,
                                    gstInformation: true,
                                },
                            })];
                    case 3:
                        deletedJournal = _a.sent();
                        res.status(200).json({ success: true, deletedJournal: deletedJournal, message: "journal entry delete sucessfully" });
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return JournalController;
}());
exports.default = JournalController;
//# sourceMappingURL=account.journal.controller.js.map