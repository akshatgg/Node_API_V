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
var index_1 = require("../index");
var client_1 = require("@prisma/client");
var runtime_1 = require("@prisma/client/runtime");
var payment_service_1 = __importDefault(require("./payment/payment.service"));
var calculateGST = function (price, gstPercentage) {
    var gstMultiplier = gstPercentage.div(new runtime_1.Decimal(100));
    var gstAmount = price.mul(gstMultiplier);
    var totalPrice = price.add(gstAmount);
    return totalPrice;
};
var OrdersController = /** @class */ (function () {
    function OrdersController() {
    }
    OrdersController.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, services, stateOfSupply, userId, serviceRecords, totalPrice, totalGst, orderTotal, order, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, services = _a.services, stateOfSupply = _a.stateOfSupply;
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.service.findMany({
                                where: {
                                    id: {
                                        in: services
                                    }
                                }
                            })];
                    case 1:
                        serviceRecords = _b.sent();
                        if (serviceRecords.some(function (x) { return !x; })) {
                            return [2 /*return*/, res.status(404).json({ success: false, message: "Invalid service ID" })];
                        }
                        totalPrice = serviceRecords.reduce(function (totalPrice, service) { return totalPrice.add(service.price); }, new runtime_1.Decimal(0.0));
                        totalGst = serviceRecords.reduce(function (totalGst, service) { return totalGst.add(service.gst); }, new runtime_1.Decimal(0.0));
                        orderTotal = calculateGST(totalPrice, totalGst);
                        return [4 /*yield*/, index_1.prisma.order.create({
                                data: {
                                    services: services,
                                    status: client_1.OrderStatus.initiated,
                                    price: totalPrice,
                                    userId: userId,
                                    gst: totalGst,
                                    orderTotal: orderTotal,
                                    stateOfSupply: stateOfSupply,
                                },
                            })];
                    case 2:
                        order = _b.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Order created successfully', data: order })];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to create order' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.getOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, orders, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.order.findMany({ where: { userId: userId } })];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Orders fetched successfully', data: orders })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to fetch orders' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.getOrderById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, order, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.order.findFirst({ where: { id: parseInt(id), userId: userId } })];
                    case 2:
                        order = _a.sent();
                        if (order) {
                            return [2 /*return*/, res.json({ success: true, message: 'Order fetched successfully', data: order })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Order not found' })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to fetch order' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.updateOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, userId, email, phone, order, status, updatedOrder, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        _a = req.user, userId = _a.id, email = _a.email, phone = _a.phone;
                        return [4 /*yield*/, index_1.prisma.order.findFirst({ where: { id: parseInt(id), userId: userId } })];
                    case 2:
                        order = _b.sent();
                        if (!order) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'Order does not exists.' })];
                        }
                        return [4 /*yield*/, payment_service_1.default.transaction({
                                email: email,
                                phone: phone,
                                txnid: String(order.id),
                                amount: order.orderTotal.toString(),
                            })];
                    case 3:
                        status = (_b.sent()).data.status;
                        return [4 /*yield*/, index_1.prisma.order.update({
                                where: { id: parseInt(id) },
                                data: {
                                    status: status
                                },
                            })];
                    case 4:
                        updatedOrder = _b.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Order updated successfully', data: updatedOrder })];
                    case 5:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to update order' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.deleteOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, order, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.order.findFirst({ where: { id: parseInt(id), userId: userId } })];
                    case 2:
                        order = _a.sent();
                        if (!order) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'Order does not exists.' })];
                        }
                        return [4 /*yield*/, index_1.prisma.order.delete({ where: { id: parseInt(id) } })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'Order deleted successfully' })];
                    case 4:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Failed to delete order' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersController;
}());
exports.default = OrdersController;
//# sourceMappingURL=orders.controller.js.map