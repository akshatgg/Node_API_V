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
var index_1 = require("../index");
var BusinessSettingController = /** @class */ (function () {
    function BusinessSettingController() {
    }
    BusinessSettingController.createBusiness = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, phone, email, gstNo, panNo, street, state, pin, city, accountNo, ifscCode, bank_branchName, acc_holderName, industryType, businessType, existingUser, newBusinessSetting, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        _a = req.body, phone = _a.phone, email = _a.email, gstNo = _a.gstNo, panNo = _a.panNo, street = _a.street, state = _a.state, pin = _a.pin, city = _a.city, accountNo = _a.accountNo, ifscCode = _a.ifscCode, bank_branchName = _a.bank_branchName, acc_holderName = _a.acc_holderName, industryType = _a.industryType, businessType = _a.businessType;
                        return [4 /*yield*/, index_1.prisma.user.findUnique({ where: { id: userId } })];
                    case 1:
                        existingUser = _b.sent();
                        if (!existingUser) {
                            res.status(404).json({ error: 'User not found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.businessSetting.create({
                                data: {
                                    phone: phone,
                                    email: email,
                                    gstNo: gstNo,
                                    panNo: panNo,
                                    street: street,
                                    state: state,
                                    pin: pin,
                                    city: city,
                                    accountNo: accountNo,
                                    ifscCode: ifscCode,
                                    bank_branchName: bank_branchName,
                                    acc_holderName: acc_holderName,
                                    industryType: industryType,
                                    businessType: businessType,
                                    userId: userId,
                                }
                            })];
                    case 2:
                        newBusinessSetting = _b.sent();
                        res.status(201).json({ result: newBusinessSetting, message: 'Sucessfull Business Setting created' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        res.status(500).json({ success: false, message: 'Internal server error', errors: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // find All business Setting
    BusinessSettingController.findAllSetting = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allBusinessSetting, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.prisma.businessSetting.findMany({})];
                    case 1:
                        allBusinessSetting = _a.sent();
                        res.status(200).json({ success: true, allBusinessSetting: allBusinessSetting });
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
    //get business setting by id
    BusinessSettingController.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, Business, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, index_1.prisma.businessSetting.findUnique({
                                where: { id: parseInt(id) },
                            })];
                    case 1:
                        Business = _a.sent();
                        if (!Business) {
                            res.status(404).json({ sucess: false, message: 'Business Setting not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json(Business);
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
    BusinessSettingController.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, phone, email, gstNo, panNo, street, state, pin, city, accountNo, ifscCode, bank_branchName, acc_holderName, industryType, businessType, updatedBusinessSetting, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, phone = _a.phone, email = _a.email, gstNo = _a.gstNo, panNo = _a.panNo, street = _a.street, state = _a.state, pin = _a.pin, city = _a.city, accountNo = _a.accountNo, ifscCode = _a.ifscCode, bank_branchName = _a.bank_branchName, acc_holderName = _a.acc_holderName, industryType = _a.industryType, businessType = _a.businessType;
                        return [4 /*yield*/, index_1.prisma.businessSetting.update({
                                where: { id: parseInt(id) },
                                data: {
                                    phone: phone,
                                    email: email,
                                    gstNo: gstNo,
                                    panNo: panNo,
                                    street: street,
                                    state: state,
                                    pin: pin,
                                    city: city,
                                    accountNo: accountNo,
                                    ifscCode: ifscCode,
                                    bank_branchName: bank_branchName,
                                    acc_holderName: acc_holderName,
                                    industryType: industryType,
                                    businessType: businessType,
                                },
                            })];
                    case 1:
                        updatedBusinessSetting = _b.sent();
                        res.status(200).json({ success: true, updatedBusinessSetting: updatedBusinessSetting });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete ledger
    BusinessSettingController.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deletedBusinessSetting, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, index_1.prisma.businessSetting.delete({
                                where: { id: parseInt(id) },
                            })];
                    case 1:
                        deletedBusinessSetting = _a.sent();
                        res.status(200).json({ success: true, deletedBusinessSetting: deletedBusinessSetting, message: "Businesss Setting delete sucessfully" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BusinessSettingController;
}());
exports.default = BusinessSettingController;
//# sourceMappingURL=BusinessSetting.js.map