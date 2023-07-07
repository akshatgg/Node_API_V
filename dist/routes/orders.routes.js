"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orders_controller_1 = __importDefault(require("../controllers/orders.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var ordersRouter = (0, express_1.Router)();
ordersRouter.post('/', verify_token_1.default, orders_controller_1.default.createOrder);
ordersRouter.get('/', verify_token_1.default, orders_controller_1.default.getOrders);
ordersRouter.get('/:id', verify_token_1.default, orders_controller_1.default.getOrderById);
ordersRouter.put('/:id', verify_token_1.default, orders_controller_1.default.updateOrder);
ordersRouter.delete('/:id', verify_token_1.default, orders_controller_1.default.deleteOrder);
exports.default = ordersRouter;
//# sourceMappingURL=orders.routes.js.map