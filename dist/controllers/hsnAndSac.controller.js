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
var fs_1 = __importDefault(require("fs"));
var hsncode_json_1 = __importDefault(require("../config/hsncode.json"));
var saccodes_json_1 = __importDefault(require("../config/saccodes.json"));
var promises_1 = require("fs/promises");
var path_1 = require("path");
var HsnAndSacController = /** @class */ (function () {
    function HsnAndSacController() {
    }
    HsnAndSacController.updatehscode = function (cards) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, promises_1.writeFile)(HsnAndSacController.FilePath, JSON.stringify(cards))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HsnAndSacController.updatesaccode = function (cards) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, promises_1.writeFile)(HsnAndSacController.sacfile, JSON.stringify(cards))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // controller for hsn codes
    HsnAndSacController.getallHsncode = function (req, res) {
        try {
            return res.status(200).json({
                success: true,
                data: hsncode_json_1.default
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    };
    HsnAndSacController.getbyhsncode = function (req, res) {
        try {
            var hsncode_1 = req.body.hsncode;
            // Read the content of hsncode.json
            var hsncodeData = JSON.parse(fs_1.default.readFileSync(HsnAndSacController.FilePath, 'utf-8'));
            // Find the object in the array based on the provided HSN code
            var foundObject = hsncodeData.find(function (item) { return item.HSNCode === hsncode_1; });
            if (foundObject) {
                // If the object is found, return it in the response
                return res.status(200).json({
                    success: true,
                    data: foundObject
                });
            }
            else {
                // If the object is not found, return a message indicating it
                return res.status(404).json({
                    success: false,
                    message: 'Object not found for the provided HSN code.'
                });
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong.'
            });
        }
    };
    // contoller for sac codes
    HsnAndSacController.getallSaccode = function (req, res) {
        try {
            return res.status(200).json({
                success: true,
                data: saccodes_json_1.default
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    };
    HsnAndSacController.getbysaccode = function (req, res) {
        try {
            var saccode_1 = req.body.saccode;
            // Read the content of hsncode.json
            var saccodeData = JSON.parse(fs_1.default.readFileSync(HsnAndSacController.sacfile, 'utf-8'));
            // Find the object in the array based on the provided HSN code
            var foundObject = saccodeData.find(function (item) { return item.SACCode === saccode_1; });
            if (foundObject) {
                // If the object is found, return it in the response
                return res.status(200).json({
                    success: true,
                    data: foundObject
                });
            }
            else {
                // If the object is not found, return a message indicating it
                return res.status(404).json({
                    success: false,
                    message: 'Object not found for the provided SAC code.'
                });
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong.'
            });
        }
    };
    HsnAndSacController.FilePath = (0, path_1.join)(__dirname, '..', 'config/hsncode.json');
    HsnAndSacController.sacfile = (0, path_1.join)(__dirname, '..', 'config/saccodes.json');
    return HsnAndSacController;
}());
exports.default = HsnAndSacController;
//# sourceMappingURL=hsnAndSac.controller.js.map