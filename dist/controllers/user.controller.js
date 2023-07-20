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
var __1 = require("..");
var util_1 = require("../lib/util");
var bcrypt_1 = __importDefault(require("bcrypt"));
var email_service_1 = __importDefault(require("../services/email.service"));
var token_service_1 = __importDefault(require("../services/token.service"));
var client_1 = require("@prisma/client");
var zod_1 = require("zod");
var UserSchema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: "First name is required" }).min(1, "First name must be atleast 1 character long"),
    lastName: zod_1.z.string().optional(),
    gender: zod_1.z.nativeEnum(client_1.UserGender),
    email: zod_1.z.string().toLowerCase().email(),
    password: zod_1.z.string().min(6, 'Password must be atleast 6 characters long'),
    phone: zod_1.z.string().regex(util_1.PHONE_NUMBER_RGX, 'Enter a valid 10 digit phone number'),
    fatherName: zod_1.z.string().optional(),
    pin: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    aadhaar: zod_1.z.string().optional(),
    pan: zod_1.z.string().optional(),
});
var LoginSchema = zod_1.z.object({
    email: zod_1.z.string().toLowerCase().email(),
    password: zod_1.z.string({ required_error: 'Please enter your password' }),
});
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.genSalt(UserController.SALT_ROUNDS)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 2:
                        hash = _a.sent();
                        return [2 /*return*/, hash];
                }
            });
        });
    };
    UserController.sendOtp = function (email, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var otp, otp_key, email_subject, email_message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        otp = (0, util_1.generateOTP)();
                        return [4 /*yield*/, __1.prisma.otp.create({
                                data: {
                                    otp: otp,
                                    userId: userId,
                                }
                            })];
                    case 1:
                        otp_key = (_a.sent()).id;
                        email_subject = "OTP: For Email Verification";
                        email_message = "Dear User, \n\n"
                            + 'OTP for your email verification is : \n\n'
                            + "".concat(otp, "\n\n")
                            + 'This is a auto-generated email. Please do not reply to this email.\n\n'
                            + 'Regards\n'
                            + 'Itaxeasy\n\n';
                        return [4 /*yield*/, email_service_1.default.sendMail(email, email_subject, email_message)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, otp_key];
                }
            });
        });
    };
    UserController.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, firstName, lastName, gender, fatherName, aadhaar, pan, pin, email, password, phone, found, hash, user, otp_key, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = UserSchema.parse(req.body), firstName = _a.firstName, lastName = _a.lastName, gender = _a.gender, fatherName = _a.fatherName, aadhaar = _a.aadhaar, pan = _a.pan, pin = _a.pin, email = _a.email, password = _a.password, phone = _a.phone;
                        return [4 /*yield*/, __1.prisma.user.findFirst({
                                where: {
                                    OR: [
                                        { email: email },
                                        { phone: phone }
                                    ]
                                },
                            })];
                    case 1:
                        found = _b.sent();
                        if (found) {
                            return [2 /*return*/, res.status(409).send({ success: false, message: "User with this email address or phone number already exists." })];
                        }
                        return [4 /*yield*/, UserController.hashPassword(password)];
                    case 2:
                        hash = _b.sent();
                        return [4 /*yield*/, __1.prisma.user.create({
                                data: {
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    gender: gender,
                                    password: hash,
                                    phone: phone,
                                    fatherName: fatherName,
                                    aadhaar: aadhaar,
                                    pan: pan,
                                    pin: pin,
                                    verified: false,
                                }
                            })];
                    case 3:
                        user = _b.sent();
                        return [4 /*yield*/, UserController.sendOtp(email, user.id)];
                    case 4:
                        otp_key = _b.sent();
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                message: "An OTP has been sent to your email \"".concat(email, "\".") +
                                    "Verify your account by using that OTP",
                                data: {
                                    user: {
                                        id: user.id,
                                        firstName: firstName,
                                        lastName: lastName,
                                        email: email,
                                        phone: phone
                                    },
                                    otp_key: otp_key
                                }
                            })];
                    case 5:
                        e_1 = _b.sent();
                        console.error(e_1);
                        if (e_1 instanceof zod_1.ZodError) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: e_1.message })];
                        }
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, authorized, otp_key, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = LoginSchema.parse(req.body), email = _a.email, password = _a.password;
                        return [4 /*yield*/, __1.prisma.user.findUnique({
                                where: { email: email }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'User with this email does not exists' })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        authorized = _b.sent();
                        if (!authorized) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'Invalid credentials' })];
                        }
                        return [4 /*yield*/, UserController.sendOtp(email, user.id)];
                    case 3:
                        otp_key = _b.sent();
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                message: "An OTP has been sent to your email \"".concat(email, "\".") +
                                    "Verify your account by using that OTP",
                                otp_key: otp_key,
                            })];
                    case 4:
                        e_2 = _b.sent();
                        console.error(e_2);
                        if (e_2 instanceof zod_1.ZodError) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: e_2.message })];
                        }
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.forgotPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, otp_key, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        email = req.body.email;
                        if (!email && !(0, util_1.validateEmail)(email)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'Email is required' })];
                        }
                        return [4 /*yield*/, __1.prisma.user.findUnique({
                                where: { email: email }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'User with this email does not exists' })];
                        }
                        return [4 /*yield*/, UserController.sendOtp(email, user.id)];
                    case 2:
                        otp_key = _a.sent();
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                message: "An OTP has been sent to your email \"".concat(email, "\".") +
                                    "Verify your account by using that OTP",
                                otp_key: otp_key,
                            })];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.verifyOtp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, otp_key, otp, id, user, otpInstance, now, validTill, token, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, email = _a.email, otp_key = _a.otp_key, otp = _a.otp;
                        id = parseInt(otp_key);
                        if (!email || !(0, util_1.validateEmail)(email)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: "Please enter a valid email address" })];
                        }
                        if (!otp_key) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: 'OTP key is required for verification' })];
                        }
                        return [4 /*yield*/, __1.prisma.user.findUnique({
                                where: { email: email }, select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    address: true,
                                    aadhaar: true,
                                    pan: true,
                                    email: true,
                                    phone: true,
                                    userType: true,
                                    verified: true,
                                    createdAt: true,
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'User with this email does not exists' })];
                        }
                        return [4 /*yield*/, __1.prisma.otp.findFirst({ where: { id: id, user: user, otp: otp } })];
                    case 2:
                        otpInstance = _b.sent();
                        if (!otpInstance) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'Invalid OTP' })];
                        }
                        now = new Date();
                        validTill = (0, util_1.addMinutesToTime)(otpInstance.createdAt, 15);
                        if ((otpInstance === null || otpInstance === void 0 ? void 0 : otpInstance.used) || now > validTill) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'This OTP has already been used or expired' })];
                        }
                        if (!!user.verified) return [3 /*break*/, 4];
                        return [4 /*yield*/, __1.prisma.user.update({ where: { id: user.id }, data: { verified: true } })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, __1.prisma.otp.update({ where: { id: id }, data: { used: true } })];
                    case 5:
                        _b.sent();
                        token = token_service_1.default.generateToken(user);
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                message: 'OTP Verified',
                                data: {
                                    user: user,
                                    token: token
                                }
                            })];
                    case 6:
                        e_4 = _b.sent();
                        console.error(e_4);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.sendVerificationOtp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, _a, id, email, otp_key, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        token = token_service_1.default.getTokenFromAuthHeader(req.headers.authorization);
                        _a = token_service_1.default.decodeToken(token), id = _a.id, email = _a.email;
                        return [4 /*yield*/, UserController.sendOtp(email, id)];
                    case 1:
                        otp_key = _b.sent();
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                message: "An OTP has been sent to your email \"".concat(email, "\".") +
                                    "Verify your account by using that OTP",
                                otp_key: otp_key,
                            })];
                    case 2:
                        e_5 = _b.sent();
                        console.log(e_5);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.changePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, newPassword, user, hash, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = req.user.id;
                        newPassword = req.body.newPassword;
                        if (!newPassword && newPassword.length >= 8) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: "Please provide a new password of atleast 8 characters" })];
                        }
                        return [4 /*yield*/, __1.prisma.user.findUnique({
                                where: { id: id }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).send({ success: false, message: 'User does not exists' })];
                        }
                        return [4 /*yield*/, UserController.hashPassword(newPassword)];
                    case 2:
                        hash = _a.sent();
                        return [4 /*yield*/, __1.prisma.user.update({
                                where: { id: id },
                                data: {
                                    password: hash
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send({ success: true, message: 'Password changed' })];
                    case 4:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.updateProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, firstName, lastName, fatherName, pin, gender, address, aadhaar, pan, phone, user, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        id = req.user.id;
                        _a = req.body, firstName = _a.firstName, lastName = _a.lastName, fatherName = _a.fatherName, pin = _a.pin, gender = _a.gender, address = _a.address, aadhaar = _a.aadhaar, pan = _a.pan, phone = _a.phone;
                        if (!firstName.length) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: "First name cannot be empty" })];
                        }
                        if (phone && !(0, util_1.validatePhone)(phone)) {
                            return [2 /*return*/, res.status(400).send({ success: false, message: "Please enter a valid phone number" })];
                        }
                        console.log(req.body);
                        return [4 /*yield*/, __1.prisma.user.findFirst({ where: { id: id } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'User does not exists' })];
                        }
                        return [4 /*yield*/, __1.prisma.user.update({
                                where: {
                                    id: user.id,
                                },
                                data: {
                                    firstName: firstName,
                                    lastName: lastName,
                                    gender: gender !== null && gender !== void 0 ? gender : user.gender,
                                    fatherName: fatherName,
                                    pin: pin !== null && pin !== void 0 ? pin : user.pin,
                                    pan: pan !== null && pan !== void 0 ? pan : user.pan,
                                    aadhaar: aadhaar !== null && aadhaar !== void 0 ? aadhaar : user.aadhaar,
                                    address: address !== null && address !== void 0 ? address : user.address,
                                    phone: phone !== null && phone !== void 0 ? phone : user.phone,
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send({ success: true, message: "Profile Updated" })];
                    case 3:
                        e_7 = _b.sent();
                        console.log(e_7);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, __1.prisma.user.findFirst({
                                select: {
                                    id: true,
                                    createdAt: true,
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                    aadhaar: true,
                                    address: true,
                                    phone: true,
                                    pan: true,
                                    userType: true,
                                },
                                where: {
                                    id: {
                                        equals: parseInt(id)
                                    }
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'User not found' })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: { user: user } })];
                    case 2:
                        e_8 = _a.sent();
                        console.error(e_8);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pageNumber, _b, order, page, users, e_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.query, pageNumber = _a.page, _b = _a.order, order = _b === void 0 ? 'desc' : _b;
                        page = parseInt(pageNumber || '0');
                        return [4 /*yield*/, __1.prisma.user.findMany({
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    phone: true,
                                    aadhaar: true,
                                    address: true,
                                    pan: true,
                                    createdAt: true,
                                    userType: true,
                                },
                                orderBy: {
                                    createdAt: order === 'asc' ? 'asc' : 'desc',
                                },
                                skip: page * UserController.USERS_PER_PAGE,
                                take: UserController.USERS_PER_PAGE,
                            })];
                    case 1:
                        users = _c.sent();
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                data: {
                                    page: page,
                                    users: users,
                                },
                            })];
                    case 2:
                        e_9 = _c.sent();
                        console.error(e_9);
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.SALT_ROUNDS = 10;
    UserController.USERS_PER_PAGE = 10;
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map