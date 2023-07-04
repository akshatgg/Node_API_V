"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __1 = require("../..");
var AccountController = /** @class */ (function () {
    function AccountController() {
    }
    AccountController.createAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, accountName, date, _b, totalDebit, _c, invoices, _d, totalCredit, _e, debitBalance, _f, creditBalance, account, e_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.body, accountName = _a.accountName, date = _a.date, _b = _a.totalDebit, totalDebit = _b === void 0 ? 0 : _b, _c = _a.invoices, invoices = _c === void 0 ? [] : _c, _d = _a.totalCredit, totalCredit = _d === void 0 ? 0 : _d, _e = _a.debitBalance, debitBalance = _e === void 0 ? 0 : _e, _f = _a.creditBalance, creditBalance = _f === void 0 ? 0 : _f;
                        if (!accountName) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Account name cannot be empty' })];
                        }
                        if (!date) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Account date cannot be empty' })];
                        }
                        return [4 /*yield*/, __1.prisma.account.create({
                                data: {
                                    accountName: accountName,
                                    date: date,
                                    totalCredit: totalCredit,
                                    totalDebit: totalDebit,
                                    debitBalance: debitBalance,
                                    creditBalance: creditBalance,
                                    invoices: {
                                        create: invoices,
                                    },
                                    userId: userId,
                                }
                            })];
                    case 1:
                        account = _g.sent();
                        return [2 /*return*/, res.status(201).json({ success: true, message: 'Account created', data: { account: account } })];
                    case 2:
                        e_1 = _g.sent();
                        console.log(e_1);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountController.updateAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, id, accountName, invoices, date, totalDebit, totalCredit, debitBalance, creditBalance, account, updatedAccount, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        _a = req.body, id = _a.id, accountName = _a.accountName, invoices = _a.invoices, date = _a.date, totalDebit = _a.totalDebit, totalCredit = _a.totalCredit, debitBalance = _a.debitBalance, creditBalance = _a.creditBalance;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Param ID is missing' })];
                        }
                        if (!accountName) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Account name cannot be empty' })];
                        }
                        if (!date) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Account date cannot be empty' })];
                        }
                        return [4 /*yield*/, __1.prisma.account.findFirst({ where: { userId: userId, id: id } })];
                    case 1:
                        account = _b.sent();
                        if (!account) {
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Account not found' })];
                        }
                        return [4 /*yield*/, __1.prisma.account.update({
                                where: {
                                    id: id
                                },
                                data: __assign(__assign({ accountName: accountName, date: date }, (invoices && {
                                    invoices: {
                                        updateMany: invoices,
                                    }
                                })), { totalCredit: totalCredit !== null && totalCredit !== void 0 ? totalCredit : account.totalCredit, totalDebit: totalDebit !== null && totalDebit !== void 0 ? totalDebit : account.totalDebit, debitBalance: debitBalance !== null && debitBalance !== void 0 ? debitBalance : account.debitBalance, creditBalance: creditBalance !== null && creditBalance !== void 0 ? creditBalance : account.creditBalance })
                            })];
                    case 2:
                        updatedAccount = _b.sent();
                        return [2 /*return*/, res.status(201).json({ success: true, message: 'Account updated', data: { account: updatedAccount } })];
                    case 3:
                        e_2 = _b.sent();
                        console.log(e_2);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AccountController.deleteAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, account, deletedAccount, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        id = req.body.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Param ID is missing' })];
                        }
                        return [4 /*yield*/, __1.prisma.account.findFirst({ where: { userId: userId, id: id } })];
                    case 1:
                        account = _a.sent();
                        if (!account) {
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Account not found' })];
                        }
                        return [4 /*yield*/, __1.prisma.account.delete({ where: { id: id } })];
                    case 2:
                        deletedAccount = _a.sent();
                        return [2 /*return*/, res.status(201).json({ success: true, message: 'Account deleted', data: { account: deletedAccount } })];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AccountController.getAccountsByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, accounts, e_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, __1.prisma.account.findMany({
                                where: { userId: userId },
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 1:
                        accounts = _d.sent();
                        res.status(200).json({ success: true, data: { accounts: accounts } });
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _d.sent();
                        console.log(e_4);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountController.getAccountById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, account, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        userId = req.user.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Param ID is missing' })];
                        }
                        return [4 /*yield*/, __1.prisma.account.findFirst({
                                where: { id: id, userId: userId },
                            })];
                    case 1:
                        account = _a.sent();
                        res.status(200).json({ success: true, data: { account: account } });
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AccountController;
}());
exports.default = AccountController;
//# sourceMappingURL=account.controller.js.map