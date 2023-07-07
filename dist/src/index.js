"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = require("express-rate-limit");
var dotenv_1 = require("dotenv");
var routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)();
var PORT = process.env.PORT || 8080;
exports.prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
var limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100, // maximum 100 requests per windowMs
});
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(limiter);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
});
app.use(routes_1.default);
app.listen(PORT, function () { return console.log("\uD83D\uDE80 Server ready at: http://localhost:".concat(PORT)); });
//# sourceMappingURL=index.js.map