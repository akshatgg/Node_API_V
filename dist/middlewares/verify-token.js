"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_service_1 = __importDefault(require("../services/token.service"));
function verifyToken(req, res, next) {
    var token = token_service_1.default.getTokenFromAuthHeader(req.headers.authorization);
    if (!token) {
        return res.status(403).send({ success: false, message: 'Authorization Token is required' });
    }
    var verified = token_service_1.default.verifyToken(token);
    if (!verified) {
        return res.status(401).send({ success: false, message: 'Unauthorized: Access is denied due to invalid credentials' });
    }
    next();
}
exports.default = verifyToken;
//# sourceMappingURL=verify-token.js.map