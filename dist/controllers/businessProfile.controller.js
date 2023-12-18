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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var BusinessProfileController = /** @class */ (function () {
    function BusinessProfileController() {
    }
    BusinessProfileController.getProfile = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, profile, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        return [4 /*yield*/, __1.prisma.businessProfile.findFirst({ where: { userId: id } })];
                    case 1:
                        profile = _b.sent();
                        // if (!profile) {
                        //     return await BusinessProfileController.update(req, res);
                        // }
                        return [2 /*return*/, res.status(200).send({ success: true, data: { profile: profile } })];
                    case 2:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessProfileController.getProfileById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, profile, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, __1.prisma.businessProfile.findFirst({ where: { id: parseInt(id) } })];
                    case 1:
                        profile = _a.sent();
                        if (!profile) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'Business Profile does not exists.' })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: { profile: profile } })];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessProfileController.getAllProfiles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, profiles, e_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, __1.prisma.businessProfile.findMany({
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 1:
                        profiles = _d.sent();
                        return [2 /*return*/, res.status(200).send({ success: true, data: { profiles: profiles } })];
                    case 2:
                        e_3 = _d.sent();
                        console.log(e_3);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessProfileController.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, user, found, profile, _id, rest, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        id = req.user.id;
                        data = req.body;
                        if (!data) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Business Profile data cannot be empty' })];
                        }
                        if (!data.businessName) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Business Name cannot be empty' })];
                        }
                        return [4 /*yield*/, __1.prisma.user.findFirst({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'User does not exists' })];
                        }
                        return [4 /*yield*/, __1.prisma.businessProfile.findFirst({
                                where: {
                                    userId: id
                                },
                            })];
                    case 2:
                        found = _a.sent();
                        profile = void 0;
                        if (!!found) return [3 /*break*/, 4];
                        data['id'] = undefined;
                        return [4 /*yield*/, __1.prisma.businessProfile.create({ data: __assign(__assign({}, data), { userId: id }) })];
                    case 3:
                        profile = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        _id = data.id, rest = __rest(data, ["id"]);
                        console.log(rest);
                        return [4 /*yield*/, __1.prisma.businessProfile.update({
                                where: {
                                    id: found.id,
                                },
                                data: __assign(__assign({}, rest), { userId: id })
                            })];
                    case 5:
                        profile = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, res.status(200).send({ success: true, message: "Profile Updated", profile: profile })];
                    case 7:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return BusinessProfileController;
}());
exports.default = BusinessProfileController;
//# sourceMappingURL=businessProfile.controller.js.map