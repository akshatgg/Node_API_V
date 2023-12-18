"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var VisitorCounter_Controller_1 = require("../controllers/VisitorCounter.Controller");
var visitorRouter = (0, express_1.Router)();
visitorRouter.post('/create', VisitorCounter_Controller_1.VisitorCounterController.create);
visitorRouter.get('/getAll', VisitorCounter_Controller_1.VisitorCounterController.getAll);
exports.default = visitorRouter;
//# sourceMappingURL=visitorCounter.routes.js.map