"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.getTokenFromAuthHeader = function (authorization) {
        var token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ').pop();
        return token;
    };
    TokenService.generateToken = function (user) {
        var token = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY, {
            issuer: "iTaxEasy",
            expiresIn: "1Y"
        });
        return token;
    };
    TokenService.decodeToken = function (token) {
        var result = jsonwebtoken_1.default.decode(token);
        return result;
    };
    TokenService.verifyToken = function (token) {
        var verified = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        return verified;
    };
    return TokenService;
}());
exports.default = TokenService;
//# sourceMappingURL=token.service.js.map