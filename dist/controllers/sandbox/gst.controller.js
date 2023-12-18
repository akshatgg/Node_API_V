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
var util_1 = require("../../lib/util");
var sandbox_service_1 = __importDefault(require("../../services/sandbox.service"));
var axios_1 = __importDefault(require("axios"));
var zod_1 = require("zod");
var GSTR4_SCHEMA = zod_1.z.object({
    gstin: zod_1.z.string({ required_error: 'GSTIN Number is required' }).regex(util_1.GSTIN_RGX, "Invalid GSTIN Number"),
    fp: zod_1.z.string(),
    txos: zod_1.z.object({
        samt: zod_1.z.number(),
        rt: zod_1.z.number(),
        camt: zod_1.z.number(),
        trnovr: zod_1.z.number(),
    }),
});
var GSTR1_SCHEMA = zod_1.z.object({
    gstin: zod_1.z.string({ required_error: 'GSTIN Number is required' }).regex(util_1.GSTIN_RGX, "Invalid GSTIN Number"),
    fp: zod_1.z.string(),
    gt: zod_1.z.number(),
    cur_gt: zod_1.z.number(),
});
var GSTController = /** @class */ (function () {
    function GSTController() {
    }
    GSTController.searchByGSTIN = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var gstin, endpoint, token, headers, _a, status, data, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        gstin = req.params.gstin;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid GSTIN" })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/public/gstin/");
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                                params: {
                                    gstin: gstin
                                }
                            })];
                    case 2:
                        _a = _b.sent(), status = _a.status, data = _a.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Something went wrong" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data })];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.searchGSTINNumberByPan = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pan, gst_state_code, endpoint, token, headers, _b, status, data, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, pan = _a.pan, gst_state_code = _a.gst_state_code;
                        if (!pan || !gst_state_code) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Required query params missing" })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/public/pan/").concat(pan, "?state_code=").concat(gst_state_code);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Something went wrong" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data })];
                    case 3:
                        e_2 = _c.sent();
                        console.log(e_2);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.trackGSTReturn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, financialYear, endpoint, token, headers, _b, status, data, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.body, gstin = _a.gstin, financialYear = _a.financialYear;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid GSTIN" })];
                        }
                        if (!financialYear) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid Financial Year" })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/public/gstr?gstin=").concat(gstin, "&financial_year=").concat(financialYear);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                                params: {
                                    gstin: gstin
                                }
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Something went wrong" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data })];
                    case 3:
                        e_3 = _c.sent();
                        console.log(e_3);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.proceedToFileGstr = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, returnPeriod, year, month, returnType, isNil, endpoint, token, headers, _b, status, data, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.body, gstin = _a.gstin, returnPeriod = _a.returnPeriod, year = _a.year, month = _a.month, returnType = _a.returnType, isNil = _a.isNil;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid GSTIN" })];
                        }
                        if (!returnPeriod || !year || !month || !returnType || !isNil) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Required Body Params missing" })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/").concat(returnType, "/").concat(year, "/").concat(month, "/proceed?is_nil=").concat(isNil);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, {
                                gstin: gstin,
                                ret_period: returnPeriod
                            }, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Something went wrong" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data })];
                    case 3:
                        e_4 = _c.sent();
                        console.log(e_4);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.registerForGST = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, payload, endpoint, token, headers, _b, status, data, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.body, gstin = _a.gstin, payload = _a.payload;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid GSTIN" })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/registration");
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, payload, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Something went wrong" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data })];
                    case 3:
                        e_5 = _c.sent();
                        console.log(e_5);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.generateOTP = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, username, endpoint, token, headers, _b, status, data, e_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.body, gstin = _a.gstin, username = _a.username;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid GSTIN" })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/otp?username=").concat(username);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, {}, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status === 401) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'Unauthorized Access' })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data })];
                    case 3:
                        e_6 = _c.sent();
                        console.log(e_6);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.verifyOTP = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, username, otp, endpoint, token, headers, response, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, gstin = _a.gstin, username = _a.username, otp = _a.otp;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid GSTIN" })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/otp/verify?username=").concat(username, "&otp=").concat(otp);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, {}, {
                                headers: headers,
                            })];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: true, message: "Could not authenticate. Something went wrong" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, message: "GSTIN: ".concat(gstin, " authenticated successfully!") })];
                    case 3:
                        e_7 = _b.sent();
                        console.log(e_7);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Upload GSTR-4
     */
    GSTController.uploadGSTR4 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, gstin, year, month, endpoint, token, headers, response, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        data = GSTR4_SCHEMA.parse(req.body);
                        _a = req.params, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!year || !month) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-4/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, data, {
                                headers: headers,
                            })];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: true, message: "Could not upload GSTR 4" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, message: "GSTR-4 Uploaded successfully!", reference_id: response.data.reference_id })];
                    case 3:
                        e_8 = _b.sent();
                        console.log(e_8);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Upload GSTR-3B
     */
    GSTController.uploadGSTR3B = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, gstin, year, month, endpoint, token, headers, response, e_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        body = req.body;
                        _a = req.params, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || !month) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-3b/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, body, {
                                headers: headers,
                            })];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: true, message: "Could not upload GSTR 4" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, message: "GSTR-3B Uploaded successfully!", reference_id: response.data.reference_id })];
                    case 3:
                        e_9 = _b.sent();
                        console.log(e_9);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * File GSTR-3B
     */
    GSTController.fileGSTR3B = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, gstin, year, month, endpoint, token, headers, response, e_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        body = req.body;
                        _a = req.params, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || !month) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-3b/").concat(year, "/").concat(month, "/file");
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, body, {
                                headers: headers,
                            })];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: true, message: "Could not upload GSTR 4" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, message: "GSTR-3B Filed successfully!", reference_id: response.data.reference_id })];
                    case 3:
                        e_10 = _b.sent();
                        console.log(e_10);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GSTR 3B Summary
     */
    GSTController.getGSTR3BSummary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.params, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: "Please enter valid GSTIN" })];
                        }
                        if (!year || !month) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-3b/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Something went wrong" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data })];
                    case 3:
                        e_11 = _c.sent();
                        console.log(e_11);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // ********   gstr 1   *********
    GSTController.gstr1AT = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/at/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 AT" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 AT found successfully!" })];
                    case 3:
                        e_12 = _c.sent();
                        console.log(e_12);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1ATA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_13;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/ata/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 ATA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 ATA found successfully!" })];
                    case 3:
                        e_13 = _c.sent();
                        console.log(e_13);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1B2B = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, ctin, action_required, from, endpoint, token, headers, _b, status, data, e_14;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, ctin = _a.ctin, action_required = _a.action_required, from = _a.from;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!ctin || !action_required || !from) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'ctin ,action_required ,from are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/b2b/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 B2B" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 B2B found successfully!" })];
                    case 3:
                        e_14 = _c.sent();
                        console.log(e_14);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1B2BA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, ctin, action_required, from, endpoint, token, headers, _b, status, data, e_15;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, ctin = _a.ctin, action_required = _a.action_required, from = _a.from;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!ctin || !action_required || !from) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'ctin ,action_required ,from are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/b2ba/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 B2BA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 B2BA found successfully!" })];
                    case 3:
                        e_15 = _c.sent();
                        console.log(e_15);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1B2CL = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, state_code, endpoint, token, headers, _b, status, data, e_16;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, state_code = _a.state_code;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!state_code) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'state_code are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/b2cl/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 B2CL" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 B2CL found successfully!" })];
                    case 3:
                        e_16 = _c.sent();
                        console.log(e_16);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1B2CLA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, state_code, endpoint, token, headers, _b, status, data, e_17;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, state_code = _a.state_code;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!state_code) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'state_code are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/b2cla/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 B2CLA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 B2CLA found successfully!" })];
                    case 3:
                        e_17 = _c.sent();
                        console.log(e_17);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1B2CS = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_18;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/b2cs/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 B2CS" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 B2CS found successfully!" })];
                    case 3:
                        e_18 = _c.sent();
                        console.log(e_18);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1B2CSA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_19;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/b2csa/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 B2CSA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 B2CSA found successfully!" })];
                    case 3:
                        e_19 = _c.sent();
                        console.log(e_19);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1CDNR = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, action_required, from, endpoint, token, headers, _b, status, data, e_20;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, action_required = _a.action_required, from = _a.from;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!action_required || !from) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'action_required AND from are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/cdnr/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 CDNR" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 CDNR found successfully!" })];
                    case 3:
                        e_20 = _c.sent();
                        console.log(e_20);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1CDNRA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, action_required, from, endpoint, token, headers, _b, status, data, e_21;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, action_required = _a.action_required, from = _a.from;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!action_required || !from) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'action_required AND from are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/cdnra/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 CDNRA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 CDNRA found successfully!" })];
                    case 3:
                        e_21 = _c.sent();
                        console.log(e_21);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1CDNUR = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_22;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/cdnur/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 CDNUR" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 CDNUR found successfully!" })];
                    case 3:
                        e_22 = _c.sent();
                        console.log(e_22);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1CDNURA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_23;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/cdnura/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 CDNURA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 CDNURA found successfully!" })];
                    case 3:
                        e_23 = _c.sent();
                        console.log(e_23);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1DocumentIssued = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_24;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/doc-issue/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 Document Isued" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 Document Isued found successfully!" })];
                    case 3:
                        e_24 = _c.sent();
                        console.log(e_24);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1EXP = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_25;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/exp/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 EXP" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 EXP found successfully!" })];
                    case 3:
                        e_25 = _c.sent();
                        console.log(e_25);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1EXPA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_26;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/expa/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 EXPA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 EXPA found successfully!" })];
                    case 3:
                        e_26 = _c.sent();
                        console.log(e_26);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1Summary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_27;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 Summary" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 Summary found successfully!" })];
                    case 3:
                        e_27 = _c.sent();
                        console.log(e_27);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1HSNSummary = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_28;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/hsn/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 HSN Summary" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 HSN Summary found successfully!" })];
                    case 3:
                        e_28 = _c.sent();
                        console.log(e_28);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr1NILSupplies = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_29;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/nil/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -1 NIL Summary" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-1 NIL Summary found successfully!" })];
                    case 3:
                        e_29 = _c.sent();
                        console.log(e_29);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.saveGstr1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, gstin, year, month, endpoint, token, headers, response, e_30;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        data = GSTR1_SCHEMA.parse(req.body);
                        _a = req.params, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || !month) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, data, {
                                headers: headers,
                            })];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: true, message: "Could not Save GSTR 1" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, message: " Save GSTR-1  successfully!", reference_id: response.data.reference_id })];
                    case 3:
                        e_30 = _b.sent();
                        console.log(e_30);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.resetGstr1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, endpoint, token, headers, response, e_31;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        data = (req.body);
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/:gstin/gstrs/gstr-1/:year/:month/reset");
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _a.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, data, {
                                headers: headers,
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: true, message: "Could not Reset GSTR 1" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, message: " Reset GSTR-1  successfully!", reference_id: response.data.reference_id })];
                    case 3:
                        e_31 = _a.sent();
                        console.log(e_31);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.fileGSTR1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, gstin, year, month, pan, otp, endpoint, token, headers, response, e_32;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        body = req.body;
                        _a = req.params, gstin = _a.gstin, year = _a.year, month = _a.month, pan = _a.pan, otp = _a.otp;
                        if (!(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || !month) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!pan || !otp) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'pan and otp are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-1/").concat(year, "/").concat(month, "/file");
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.post(endpoint, body, {
                                headers: headers,
                            })];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: true, message: "Could not File GSTR 1" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, message: "GSTR-1 Filed successfully!", reference_id: response.data.reference_id })];
                    case 3:
                        e_32 = _b.sent();
                        console.log(e_32);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // **********Return GSTR-2A******************
    GSTController.gstr2aB2B = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, ctin, endpoint, token, headers, _b, status, data, e_33;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, ctin = _a.ctin;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!ctin) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'ctin  are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-2a/b2b/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -2 B2B" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-2 B2B found successfully!" })];
                    case 3:
                        e_33 = _c.sent();
                        console.log(e_33);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr2aB2BA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, ctin, endpoint, token, headers, _b, status, data, e_34;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, ctin = _a.ctin;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!ctin) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'ctin  are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-2a/b2ba/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -2 B2BA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-2 B2BA found successfully!" })];
                    case 3:
                        e_34 = _c.sent();
                        console.log(e_34);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr2aCDN = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, ctin, endpoint, token, headers, _b, status, data, e_35;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, ctin = _a.ctin;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!ctin) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'ctin  are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-2a/cdn/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -2 CDN" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-2 CDN found successfully!" })];
                    case 3:
                        e_35 = _c.sent();
                        console.log(e_35);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr2aCDNA = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, ctin, endpoint, token, headers, _b, status, data, e_36;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month, ctin = _a.ctin;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        if (!ctin) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'ctin  are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-2a/cdna/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -2 CDNA" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-2 CDNA found successfully!" })];
                    case 3:
                        e_36 = _c.sent();
                        console.log(e_36);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr2aISD = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_37;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-2a/isd/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -2 ISD" })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-2 ISD found successfully!" })];
                    case 3:
                        e_37 = _c.sent();
                        console.log(e_37);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GSTController.gstr2A = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_38;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-2a/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -2 " })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-2  found successfully!" })];
                    case 3:
                        e_38 = _c.sent();
                        console.log(e_38);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // ************************* GSTR -2B *********************************
    GSTController.gstr2B = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gstin, year, month, endpoint, token, headers, _b, status, data, e_39;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.query, gstin = _a.gstin, year = _a.year, month = _a.month;
                        if (!gstin || typeof gstin !== 'string' || !(0, util_1.validateGSTIN)(gstin)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Invalid GSTIN Number' })];
                        }
                        if (!year || typeof year !== 'string' || !month || typeof month !== 'string') {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Year and Month are required' })];
                        }
                        endpoint = "".concat(sandbox_service_1.default.BASE_URL, "/gsp/tax-payer/").concat(gstin, "/gstrs/gstr-2b/").concat(year, "/").concat(month);
                        return [4 /*yield*/, sandbox_service_1.default.generateAccessToken()];
                    case 1:
                        token = _c.sent();
                        headers = {
                            'Authorization': token,
                            'accept': 'application/json',
                            'x-api-key': process.env.SANDBOX_KEY,
                            'x-api-version': process.env.SANDBOX_API_VERSION
                        };
                        return [4 /*yield*/, axios_1.default.get(endpoint, {
                                headers: headers,
                            })];
                    case 2:
                        _b = _c.sent(), status = _b.status, data = _b.data.data;
                        if (status !== 200) {
                            return [2 /*return*/, res.status(500).send({ success: false, message: "Could not find GSTR -2B " })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: data, message: "GSTR-2B  found successfully!" })];
                    case 3:
                        e_39 = _c.sent();
                        console.log(e_39);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GSTController;
}());
exports.default = GSTController;
//# sourceMappingURL=gst.controller.js.map