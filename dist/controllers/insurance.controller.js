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
var zod_1 = require("zod");
var util_1 = require("../lib/util");
var client_1 = require("@prisma/client");
var __1 = require("..");
var InsuranceSchema = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    mobile: zod_1.z.string().regex(util_1.PHONE_NUMBER_RGX, 'Enter valid 10 digit mobile number'),
    maritalStatus: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(client_1.UserGender),
    type: zod_1.z.string(),
    dob: zod_1.z.coerce.date(),
});
var InsuranceController = /** @class */ (function () {
    function InsuranceController() {
    }
    InsuranceController.applyForInsurance = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, name, address, mobile, dob, gender, maritalStatus, type, application, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = InsuranceSchema.parse(req.body), name = _a.name, address = _a.address, mobile = _a.mobile, dob = _a.dob, gender = _a.gender, maritalStatus = _a.maritalStatus, type = _a.type;
                        return [4 /*yield*/, __1.prisma.insurance.create({
                                data: {
                                    name: name,
                                    address: address,
                                    mobile: mobile,
                                    dob: dob,
                                    gender: gender,
                                    maritalStatus: maritalStatus,
                                    type: type,
                                    userId: userId,
                                }
                            })];
                    case 1:
                        application = _b.sent();
                        return [2 /*return*/, res.status(201).json({ success: true, message: 'Successfully applied for insurance', application: application })];
                    case 2:
                        e_1 = _b.sent();
                        console.log(e_1);
                        if (e_1 instanceof zod_1.ZodError) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: e_1.message })];
                        }
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InsuranceController.getInsuranceById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, insurance, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        id = req.params.id;
                        return [4 /*yield*/, __1.prisma.insurance.findUnique({ where: { id: id } })];
                    case 1:
                        insurance = _a.sent();
                        if (insurance && (insurance.userId != userId || !req.isAdmin)) {
                            return [2 /*return*/, res.status(403).json({ success: false, message: 'Unauthorized Access' })];
                        }
                        return [2 /*return*/, res.status(200).json({ success: true, application: insurance })];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InsuranceController.getInsuranceApplications = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, order, _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, count, applications, e_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        order = req.query.order;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, __1.prisma.insurance.count({
                                where: { userId: userId }
                            })];
                    case 1:
                        count = _d.sent();
                        return [4 /*yield*/, __1.prisma.insurance.findMany({
                                where: { userId: userId },
                                orderBy: {
                                    createdAt: order === 'asc' ? 'asc' : 'desc',
                                },
                                take: parsedLimit,
                                skip: offset
                            })];
                    case 2:
                        applications = _d.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, applications: applications, totalApplications: count })];
                    case 3:
                        e_3 = _d.sent();
                        console.log(e_3);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InsuranceController.getInsuranceApplicationsByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, order, _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, count, applications, e_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        userId = parseInt(id);
                        order = req.query.order;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, __1.prisma.insurance.count({
                                where: { userId: userId }
                            })];
                    case 1:
                        count = _d.sent();
                        return [4 /*yield*/, __1.prisma.insurance.findMany({
                                where: { userId: userId },
                                orderBy: {
                                    createdAt: order === 'asc' ? 'asc' : 'desc',
                                },
                                take: parsedLimit,
                                skip: offset
                            })];
                    case 2:
                        applications = _d.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, applications: applications, totalApplications: count })];
                    case 3:
                        e_4 = _d.sent();
                        console.log(e_4);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return InsuranceController;
}());
exports.default = InsuranceController;
//# sourceMappingURL=insurance.controller.js.map