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
exports.axiosCall = exports.createPaymentForm = exports.validatePaymentData = exports.getQueryURL = exports.getPaymentURL = exports.checkReverseHash = exports.generateTransactionHash = exports.generateTransactionDateHash = exports.generateRefundHash = exports.generatePayoutHash = exports.generateHash = void 0;
var crypto_1 = __importDefault(require("crypto"));
var axios_1 = __importDefault(require("axios"));
var util_1 = require("../../lib/util");
var constants_1 = require("./constants");
function generateHash(data, config) {
    var hashString = [config.key, data.txnid, data.amount, data.productinfo, data.name, data.email, data.udf1, data.udf2, data.udf3, data.udf4, data.udf5, data.udf6, data.udf7, data.udf8, data.udf9, data.udf10, config.salt,].join('|');
    var sha512 = crypto_1.default.createHash('sha512');
    sha512.update(hashString);
    data.hash = sha512.digest('hex');
    return data.hash;
}
exports.generateHash = generateHash;
function generatePayoutHash(data, config) {
    var hashString = [config.key, data.merchant_email, data.payout_date, config.salt].join('|');
    var sha512 = crypto_1.default.createHash('sha512');
    sha512.update(hashString);
    var payoutHashKey = sha512.digest('hex');
    return payoutHashKey;
}
exports.generatePayoutHash = generatePayoutHash;
function generateRefundHash(data, config) {
    var hashString = [config.key, data.txnid, data.amount, data.refund_amount, data.merchant_email, data.phone, config.salt].join('|');
    var sha512 = crypto_1.default.createHash('sha512');
    sha512.update(hashString);
    var refundHashKey = sha512.digest('hex');
    return refundHashKey;
}
exports.generateRefundHash = generateRefundHash;
function generateTransactionDateHash(data, config) {
    var hashString = [config.key, data.merchant_email, data.transaction_date].join('|');
    var sha512 = crypto_1.default.createHash('sha512');
    sha512.update(hashString);
    data.hash = sha512.digest('hex');
    return data.hash;
}
exports.generateTransactionDateHash = generateTransactionDateHash;
function generateTransactionHash(data, config) {
    var hashString = [config.key, data.txnid, data.amount, data.email, data.phone, config.salt].join('|');
    var sha512 = crypto_1.default.createHash('sha512');
    sha512.update(hashString);
    var transactionHash = sha512.digest('hex');
    return transactionHash;
}
exports.generateTransactionHash = generateTransactionHash;
function checkReverseHash(data, config) {
    var hashString = [config.salt, data.status, data.udf10, data.udf9, data.udf8, data.udf7, data.udf6, data.udf5, data.udf4, data.udf3, data.udf2, data.udf1, data.email, data.firstname, data.productinfo, data.amount, data.txnid, data.key].join('|');
    var sha512 = crypto_1.default.createHash('sha512');
    sha512.update(hashString);
    var hashKey = sha512.digest('hex');
    if (hashKey === data.hash) {
        return true;
    }
    return false;
}
exports.checkReverseHash = checkReverseHash;
function getPaymentURL(env) {
    return env === 'prod'
        ? constants_1.EASEBUZZ_PROD_ENDPOINT
        : constants_1.EASEBUZZ_TEST_ENDPOINT;
}
exports.getPaymentURL = getPaymentURL;
function getQueryURL(env) {
    return env === 'prod' ? constants_1.EASEBUZZ_DASHBOARD_ENDPOINT : "";
}
exports.getQueryURL = getQueryURL;
function validatePaymentData(data) {
    if (!data.name.trim()) {
        return "Mandatory Parameter name cannot be empty";
    }
    if (!(data.amount.trim()) || !parseFloat(data.amount)) {
        return "Mandatory Parameter amount cannot be empty and must be in decimal";
    }
    if (!data.txnid.trim()) {
        return "Merchant Transaction validation failed. Please enter a proper value for merchant txn";
    }
    if (!data.email.trim() || !(0, util_1.validateEmail)(data.email)) {
        return "Email validation failed. Please enter a proper value for email";
    }
    if (!data.phone.trim() || !(0, util_1.validatePhone)(data.phone)) {
        return "Phone validation failed. Please enter a proper value for phone";
    }
    if (!data.productinfo.trim()) {
        return "Mandatory Parameter Product info cannot be empty";
    }
    if (!data.surl.trim() || !data.furl.trim()) {
        return "Mandatory Parameter Surl/Furl cannot be empty";
    }
    return null;
}
exports.validatePaymentData = validatePaymentData;
function createPaymentForm(data, config) {
    var form = {
        'key': config.key,
        'txnid': data.txnid,
        'amount': data.amount,
        'email': data.email,
        'phone': data.phone,
        'firstname': data.name,
        'udf1': data.udf1,
        'udf2': data.udf2,
        'udf3': data.udf3,
        'udf4': data.udf4,
        'udf5': data.udf5,
        'hash': generateHash(data, config),
        'productinfo': data.productinfo,
        'udf6': data.udf6,
        'udf7': data.udf7,
        'udf8': data.udf8,
        'udf9': data.udf9,
        'udf10': data.udf10,
        'furl': data.furl,
        'surl': data.surl,
    };
    if (data.unique_id) {
        form.unique_id = data.unique_id;
    }
    if (data.split_payments) {
        form.split_payments = data.split_payments;
    }
    if (data.sub_merchant_id) {
        form.sub_merchant_id = data.sub_merchant_id;
    }
    if (data.customer_authentication_id) {
        form.customer_authentication_id = data.customer_authentication_id;
    }
    return form;
}
exports.createPaymentForm = createPaymentForm;
function axiosCall(url, data, method) {
    if (method === void 0) { method = 'POST'; }
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        method: method,
                        url: url,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        data: data,
                    };
                    return [4 /*yield*/, (0, axios_1.default)(config)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.axiosCall = axiosCall;
//# sourceMappingURL=utils.js.map