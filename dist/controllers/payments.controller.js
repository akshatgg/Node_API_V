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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var token_service_1 = __importDefault(require("../services/token.service"));
var PaymentsController = /** @class */ (function () {
    function PaymentsController() {
    }
    PaymentsController.createPayment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, razorpay_order_id, razorpay_payment_id, status, orderId, token, userId, user, payment, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, razorpay_order_id = _a.razorpay_order_id, razorpay_payment_id = _a.razorpay_payment_id, status = _a.status, orderId = _a.orderId;
                        token = token_service_1.default.getTokenFromAuthHeader(req.headers.authorization);
                        userId = token_service_1.default.decodeToken(token).id;
                        return [4 /*yield*/, index_1.prisma.user.findUnique({ where: { id: userId } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).json({ sucess: false, message: 'User not found' })];
                        }
                        return [4 /*yield*/, index_1.prisma.payment.create({
                                data: {
                                    razorpay_order_id: razorpay_order_id,
                                    razorpay_payment_id: razorpay_payment_id,
                                    status: status,
                                    userId: userId,
                                    orderId: orderId,
                                },
                            })];
                    case 2:
                        payment = _b.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Payment created successfully', data: payment })];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to create payment' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PaymentsController.getPayments = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId, payments, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = token_service_1.default.getTokenFromAuthHeader(req.headers.authorization);
                        userId = token_service_1.default.decodeToken(token).id;
                        return [4 /*yield*/, index_1.prisma.payment.findMany({ where: { userId: userId } })];
                    case 1:
                        payments = _a.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Payments fetched successfully', data: payments })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to fetch payments' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentsController.getPaymentById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, token, userId, payment, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        token = token_service_1.default.getTokenFromAuthHeader(req.headers.authorization);
                        userId = token_service_1.default.decodeToken(token).id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.prisma.payment.findFirst({ where: { id: id, userId: userId } })];
                    case 2:
                        payment = _a.sent();
                        if (payment) {
                            return [2 /*return*/, res.json({ success: true, message: 'Payment fetched successfully', data: payment })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Payment not found' })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to fetch payment' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PaymentsController.updatePayment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, razorpay_order_id, razorpay_payment_id, status, orderId, token, userId, payment, updatedPayment, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, razorpay_order_id = _a.razorpay_order_id, razorpay_payment_id = _a.razorpay_payment_id, status = _a.status, orderId = _a.orderId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        token = token_service_1.default.getTokenFromAuthHeader(req.headers.authorization);
                        userId = token_service_1.default.decodeToken(token).id;
                        return [4 /*yield*/, index_1.prisma.payment.findUnique({ where: { id: id } })];
                    case 2:
                        payment = _b.sent();
                        if ((payment === null || payment === void 0 ? void 0 : payment.userId) !== userId) {
                            return [2 /*return*/, res.status(403).send({ success: false, message: 'Unauthorized Access' })];
                        }
                        return [4 /*yield*/, index_1.prisma.payment.update({
                                where: { id: id },
                                data: {
                                    razorpay_order_id: razorpay_order_id,
                                    razorpay_payment_id: razorpay_payment_id,
                                    status: status,
                                    userId: userId,
                                    orderId: orderId,
                                },
                            })];
                    case 3:
                        updatedPayment = _b.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Payment updated successfully', data: updatedPayment })];
                    case 4:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to update payment' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PaymentsController.deletePayment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, token, userId, payment, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        token = token_service_1.default.getTokenFromAuthHeader(req.headers.authorization);
                        userId = token_service_1.default.decodeToken(token).id;
                        return [4 /*yield*/, index_1.prisma.payment.findUnique({ where: { id: id } })];
                    case 2:
                        payment = _a.sent();
                        if ((payment === null || payment === void 0 ? void 0 : payment.userId) !== userId) {
                            return [2 /*return*/, res.status(403).send({ success: false, message: 'Unauthorized Access' })];
                        }
                        return [4 /*yield*/, index_1.prisma.payment.delete({ where: { id: id } })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Payment deleted successfully' })];
                    case 4:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to delete payment' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PaymentsController;
}());
exports.default = PaymentsController;
//# sourceMappingURL=payments.controller.js.map