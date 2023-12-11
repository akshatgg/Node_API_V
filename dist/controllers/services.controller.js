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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var ServicesController = /** @class */ (function () {
    function ServicesController() {
    }
    ServicesController.createService = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, serviceName, serviceType, imgUrl, description, price, gst, documents, service, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, serviceName = _a.serviceName, serviceType = _a.serviceType, imgUrl = _a.imgUrl, description = _a.description, price = _a.price, gst = _a.gst, documents = _a.documents;
                        return [4 /*yield*/, index_1.prisma.service.create({
                                data: {
                                    serviceName: serviceName,
                                    serviceType: serviceType,
                                    imgUrl: imgUrl,
                                    description: description,
                                    price: price,
                                    gst: gst,
                                    documents: documents,
                                },
                            })];
                    case 1:
                        service = _b.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Service created successfully', data: service })];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to create service' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServicesController.getServices = function (_, res) {
        return __awaiter(this, void 0, void 0, function () {
            var services, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.prisma.service.findMany()];
                    case 1:
                        services = _a.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Services fetched successfully', data: services })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to fetch services' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServicesController.getServiceById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, service, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.prisma.service.findUnique({ where: { id: id } })];
                    case 2:
                        service = _a.sent();
                        if (service) {
                            return [2 /*return*/, res.json({ success: true, message: 'Service fetched successfully', data: service })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Service not found' })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to fetch service' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServicesController.updateService = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, serviceName, serviceType, imgUrl, description, price, gst, documents, updatedService, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, serviceName = _a.serviceName, serviceType = _a.serviceType, imgUrl = _a.imgUrl, description = _a.description, price = _a.price, gst = _a.gst, documents = _a.documents;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.prisma.service.update({
                                where: { id: id },
                                data: {
                                    serviceName: serviceName,
                                    serviceType: serviceType,
                                    imgUrl: imgUrl,
                                    description: description,
                                    price: price,
                                    gst: gst,
                                    documents: documents,
                                },
                            })];
                    case 2:
                        updatedService = _b.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Service updated successfully', data: updatedService })];
                    case 3:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to update service' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServicesController.deleteService = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.prisma.service.delete({ where: { id: id } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Service deleted successfully' })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to delete service' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ServicesController;
}());
exports.default = ServicesController;
//# sourceMappingURL=services.controller.js.map