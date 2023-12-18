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
var utils_1 = require("./utils");
var config_1 = require("./config");
var schemas_1 = require("./schemas");
var zod_1 = require("zod");
var PaymentService = /** @class */ (function () {
    function PaymentService() {
    }
    PaymentService.initiatePayment = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var validationError, paymentUrl, callUrl, formData, easeBuzzResponse, accessKey, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        validationError = (0, utils_1.validatePaymentData)(data);
                        if (validationError) {
                            throw new Error(validationError);
                        }
                        (0, utils_1.generateHash)(data, config_1.config);
                        paymentUrl = (0, utils_1.getPaymentURL)(config_1.config.env);
                        callUrl = "".concat(paymentUrl, "/payment/initiateLink");
                        formData = (0, utils_1.createPaymentForm)(data, config_1.config);
                        return [4 /*yield*/, (0, utils_1.axiosCall)(callUrl, formData)];
                    case 1:
                        easeBuzzResponse = _a.sent();
                        if (!easeBuzzResponse.status) {
                            throw new Error("Payment Gateway Error");
                        }
                        accessKey = easeBuzzResponse.data;
                        return [2 /*return*/, {
                                'success': true,
                                'key': config_1.config.key,
                                'access_key': accessKey,
                            }];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, {
                                success: false,
                                error: e_1
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentService.payout = function (requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, hash, formData, baseUrl, callUrl, easeBuzzResponse, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = schemas_1.payoutSchema.parse(requestData);
                        hash = (0, utils_1.generatePayoutHash)(data, config_1.config);
                        formData = __assign(__assign({ merchant_key: config_1.config.key }, data), { hash: hash });
                        baseUrl = (0, utils_1.getQueryURL)(config_1.config.env);
                        if (!baseUrl) {
                            throw new Error("Environment not supported");
                        }
                        callUrl = "".concat(baseUrl, "payout/v1/retrieve");
                        return [4 /*yield*/, (0, utils_1.axiosCall)(callUrl, formData)];
                    case 1:
                        easeBuzzResponse = _a.sent();
                        if (!easeBuzzResponse.status) {
                            throw new Error("Payment Gateway Error");
                        }
                        return [2 /*return*/, { success: true, data: easeBuzzResponse.data }];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        if (e_2 instanceof zod_1.ZodError) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: e_2.message,
                                }];
                        }
                        return [2 /*return*/, { success: false, message: "Something went wrong" }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentService.refund = function (requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, hash, formData, baseUrl, callUrl, easeBuzzResponse, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = schemas_1.refundSchema.parse(requestData);
                        hash = (0, utils_1.generateRefundHash)(data, config_1.config);
                        formData = __assign(__assign({ key: config_1.config.key }, data), { hash: hash });
                        baseUrl = (0, utils_1.getQueryURL)(config_1.config.env);
                        if (!baseUrl) {
                            return [2 /*return*/, { success: false, message: "Environment not supported" }];
                        }
                        callUrl = "".concat(baseUrl, "transaction/v1/refund");
                        return [4 /*yield*/, (0, utils_1.axiosCall)(callUrl, formData)];
                    case 1:
                        easeBuzzResponse = _a.sent();
                        if (!easeBuzzResponse.status) {
                            return [2 /*return*/, { success: false, message: "Payment Gateway Error" }];
                        }
                        return [2 /*return*/, { success: true, data: easeBuzzResponse.data }];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        if (e_3 instanceof zod_1.ZodError) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: e_3.message,
                                }];
                        }
                        return [2 /*return*/, { success: false, message: "Something went wrong" }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentService.transactionDate = function (requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, hash, formData, baseUrl, callUrl, easeBuzzResponse, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = schemas_1.transactionDateSchema.parse(requestData);
                        hash = (0, utils_1.generateTransactionDateHash)(data, config_1.config);
                        formData = __assign(__assign({ merchant_key: config_1.config.key }, data), { hash: hash });
                        baseUrl = (0, utils_1.getQueryURL)(config_1.config.env);
                        if (!baseUrl) {
                            return [2 /*return*/, { success: false, message: "Environment not supported" }];
                        }
                        callUrl = "".concat(baseUrl, "transaction/v1/retrieve/date");
                        return [4 /*yield*/, (0, utils_1.axiosCall)(callUrl, formData)];
                    case 1:
                        easeBuzzResponse = _a.sent();
                        if (!easeBuzzResponse.status) {
                            return [2 /*return*/, { success: false, message: "Payment Gateway Error" }];
                        }
                        return [2 /*return*/, { success: true, data: easeBuzzResponse.data }];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        if (e_4 instanceof zod_1.ZodError) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: e_4.message,
                                }];
                        }
                        return [2 /*return*/, { success: false, message: "Something went wrong" }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentService.transaction = function (requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, hash, formData, baseUrl, callUrl, easeBuzzResponse, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        data = schemas_1.transactionSchema.parse(requestData);
                        hash = (0, utils_1.generateTransactionHash)(data, config_1.config);
                        formData = __assign(__assign({ key: config_1.config.key }, data), { hash: hash });
                        baseUrl = (0, utils_1.getQueryURL)(config_1.config.env);
                        if (!baseUrl) return [3 /*break*/, 2];
                        callUrl = "".concat(baseUrl, "transaction/v1/retrieve");
                        return [4 /*yield*/, (0, utils_1.axiosCall)(callUrl, formData)];
                    case 1:
                        easeBuzzResponse = _a.sent();
                        if (!easeBuzzResponse.status) {
                            return [2 /*return*/, { success: false, message: "Payment Gateway Error" }];
                        }
                        return [2 /*return*/, { success: true, data: easeBuzzResponse.data }];
                    case 2: return [2 /*return*/, { success: false, message: "Environment not supported" }];
                    case 3:
                        e_5 = _a.sent();
                        console.log(e_5);
                        if (e_5 instanceof zod_1.ZodError) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: e_5.message,
                                }];
                        }
                        return [2 /*return*/, { success: false, message: "Something went wrong" }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PaymentService.response = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if ((0, utils_1.checkReverseHash)(data, config_1.config)) {
                        return [2 /*return*/, { success: true, data: data }];
                    }
                    return [2 /*return*/, { success: false, error: "false, check the hash value" }];
                }
                catch (e) {
                    console.log(e);
                    if (e instanceof zod_1.ZodError) {
                        return [2 /*return*/, {
                                success: false,
                                message: e.message,
                            }];
                    }
                    return [2 /*return*/, { success: false, message: "Something went wrong" }];
                }
                return [2 /*return*/];
            });
        });
    };
    return PaymentService;
}());
exports.default = PaymentService;
//# sourceMappingURL=payment.service.js.map