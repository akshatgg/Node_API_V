"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = require("dotenv");
var routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)();
var PORT = process.env.PORT || 8080;
exports.prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(PORT, function () { return console.log("\uD83D\uDE80 Server ready at: http://localhost:".concat(PORT)); });
//# sourceMappingURL=index.js.map