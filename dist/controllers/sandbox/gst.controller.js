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
    return GSTController;
}());
exports.default = GSTController;
//# sourceMappingURL=gst.controller.js.map