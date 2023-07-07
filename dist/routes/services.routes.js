"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var services_controller_1 = __importDefault(require("../controllers/services.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var admin_check_1 = __importDefault(require("../middlewares/admin-check"));
var servicesRouter = (0, express_1.Router)();
servicesRouter.post('/', verify_token_1.default, admin_check_1.default, services_controller_1.default.createService);
servicesRouter.get('/', services_controller_1.default.getServices);
servicesRouter.get('/:id', services_controller_1.default.getServiceById);
servicesRouter.put('/:id', verify_token_1.default, admin_check_1.default, services_controller_1.default.updateService);
servicesRouter.delete('/:id', verify_token_1.default, admin_check_1.default, services_controller_1.default.deleteService);
exports.default = servicesRouter;
//# sourceMappingURL=services.routes.js.map