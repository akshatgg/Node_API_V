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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var client_1 = require("@prisma/client");
var zod_1 = __importStar(require("zod"));
var util_1 = require("../lib/util");
var __1 = require("..");
var LoanApplicationSchema = zod_1.default.object({
    loanId: zod_1.default.string({ required_error: "Loan Id is required" }),
    amount: zod_1.default.number({ required_error: "Loan Amount is required" }),
    description: zod_1.default.string(),
    documents: zod_1.default.array(zod_1.default.string()),
    applicantDetails: zod_1.default.object({
        applicantName: zod_1.default.string().min(3),
        applicantAge: zod_1.default.number().min(18, "Applicant must be atleast 18 years old to apply for loan"),
        applicantGender: zod_1.default.nativeEnum(client_1.UserGender, { required_error: "Please confirm your gender" }),
        nationality: zod_1.default.nativeEnum(client_1.Nationality, { required_error: "Please confirm your nationality" }),
        salaried: zod_1.default.boolean({ required_error: "Please select whether you are salaried or not" }),
        phone: zod_1.default.string().regex(util_1.PHONE_NUMBER_RGX, "Please Enter a valid 10 digit phone number"),
        email: zod_1.default.string().email("Please enter a valid Email"),
        permanentAddress: zod_1.default.string(),
        address: zod_1.default.string().optional(),
        bankDetails: zod_1.default.object({
            accountHolderName: zod_1.default.string().min(3),
            bankName: zod_1.default.string(),
            bankAccountNo: zod_1.default.string(),
            bankAccountType: zod_1.default.nativeEnum(client_1.BankAccountType),
            bankIfsc: zod_1.default.string(),
            bankBranch: zod_1.default.string(),
        }),
    }),
});
var LoanSchema = zod_1.default.object({
    type: zod_1.default.nativeEnum(client_1.LoanType),
    name: zod_1.default.string(),
    shortName: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    documents: zod_1.default.array(zod_1.default.object({
        id: zod_1.default.string().optional(),
        name: zod_1.default.string(),
        shortName: zod_1.default.string(),
        mandatory: zod_1.default.boolean(),
        type: zod_1.default.nativeEnum(client_1.DocumentType),
        description: zod_1.default.string().optional(),
    })),
    maxAmount: zod_1.default.number().optional(),
    minAmount: zod_1.default.number().optional(),
    interest: zod_1.default.number()
});
var LoanController = /** @class */ (function () {
    function LoanController() {
    }
    LoanController.applyForLoan = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, data, loanId, documents, amount, description, _a, applicantName, applicantAge, applicantGender, nationality, salaried, bankDetailsData, permanentAddress, address, bankDetails, application, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        data = LoanApplicationSchema.parse(req.body);
                        loanId = data.loanId, documents = data.documents, amount = data.amount, description = data.description;
                        _a = data.applicantDetails, applicantName = _a.applicantName, applicantAge = _a.applicantAge, applicantGender = _a.applicantGender, nationality = _a.nationality, salaried = _a.salaried, bankDetailsData = _a.bankDetails, permanentAddress = _a.permanentAddress, address = _a.address;
                        return [4 /*yield*/, __1.prisma.bankDetails.create({
                                data: __assign(__assign({}, bankDetailsData), { userId: userId }),
                            })];
                    case 1:
                        bankDetails = _b.sent();
                        return [4 /*yield*/, __1.prisma.loanApplication.create({
                                data: {
                                    loanId: loanId,
                                    userId: userId,
                                    applicantName: applicantName,
                                    applicantAge: applicantAge,
                                    applicantGender: applicantGender,
                                    address: address,
                                    permanentAddress: permanentAddress,
                                    nationality: nationality,
                                    salaried: salaried,
                                    loanAmount: amount,
                                    description: description,
                                    bankAccountId: bankDetails.id,
                                    documents: {
                                        connect: documents.map(function (id) { return ({ id: id }); }),
                                    },
                                },
                                include: {
                                    documents: true,
                                }
                            })];
                    case 2:
                        application = _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                success: true,
                                data: {
                                    application: application,
                                    bankDetails: bankDetails,
                                }
                            })];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        if (e_1 instanceof zod_1.ZodError) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: e_1.message })];
                        }
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoanController.getAppliedLoans = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, status, order, _b, _c, page, _d, limit, parsedPage, parsedLimit, offset, count, applications, e_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        _a = req.query, status = _a.status, order = _a.order;
                        _b = req.query, _c = _b.page, page = _c === void 0 ? 1 : _c, _d = _b.limit, limit = _d === void 0 ? 10 : _d;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, __1.prisma.loanApplication.count({
                                where: { userId: userId },
                                orderBy: {
                                    createdAt: order === 'asc' ? 'asc' : 'desc',
                                }
                            })];
                    case 1:
                        count = _e.sent();
                        return [4 /*yield*/, __1.prisma.loanApplication.findMany({
                                where: {
                                    userId: userId,
                                    loanStatus: status
                                },
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 2:
                        applications = _e.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: {
                                    totalApplications: count,
                                    applications: applications,
                                    page: page,
                                },
                            }];
                    case 3:
                        e_2 = _e.sent();
                        console.log(e_2);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong.' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoanController.getAppliedLoanById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, application, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        id = req.params.id;
                        return [4 /*yield*/, __1.prisma.loanApplication.findFirst({
                                where: {
                                    id: id,
                                    userId: userId,
                                },
                                include: {
                                    bankDetails: true,
                                    documents: true,
                                }
                            })];
                    case 1:
                        application = _a.sent();
                        if (!application) {
                            return [2 /*return*/, res.status(404).json({ success: false, message: "Loan Application not found" })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                data: {
                                    application: application
                                }
                            })];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong.' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // FOR ADMIN
    LoanController.createLoan = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, shortName, type, description, minAmount, maxAmount, documents, interest, loan, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = LoanSchema.parse(req.body), name = _a.name, shortName = _a.shortName, type = _a.type, description = _a.description, minAmount = _a.minAmount, maxAmount = _a.maxAmount, documents = _a.documents, interest = _a.interest;
                        return [4 /*yield*/, __1.prisma.loan.create({
                                data: {
                                    name: name,
                                    shortName: shortName,
                                    type: type,
                                    minAmount: minAmount,
                                    maxAmount: maxAmount,
                                    interest: interest,
                                    description: description,
                                    documents: {
                                        connectOrCreate: documents.map(function (document) { return ({
                                            where: { id: document.id },
                                            create: document,
                                        }); }),
                                    }
                                },
                            })];
                    case 1:
                        loan = _b.sent();
                        return [2 /*return*/, res.status(201).json({ success: true, message: 'Loan Created', data: { loan: loan } })];
                    case 2:
                        e_4 = _b.sent();
                        console.log(e_4);
                        if (e_4 instanceof zod_1.ZodError) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: e_4.message })];
                        }
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong.' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoanController.getAllLoans = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, count, loans, e_5;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, __1.prisma.loanApplication.count({})];
                    case 1:
                        count = _d.sent();
                        return [4 /*yield*/, __1.prisma.loan.findMany({
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 2:
                        loans = _d.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: {
                                    totalApplications: count,
                                    loans: loans,
                                    page: page,
                                },
                            }];
                    case 3:
                        e_5 = _d.sent();
                        console.log(e_5);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong.' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoanController.getLoanById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, loan, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, __1.prisma.loan.findFirst({
                                where: {
                                    id: id,
                                },
                                include: {
                                    documents: true,
                                }
                            })];
                    case 1:
                        loan = _a.sent();
                        if (!loan) {
                            return [2 /*return*/, res.status(404).json({ success: false, message: "Loan Type not found" })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                data: {
                                    loan: loan
                                }
                            })];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong.' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LoanController;
}());
exports.default = LoanController;
//# sourceMappingURL=loan.controller.js.map