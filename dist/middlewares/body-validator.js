"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyValidator = function (req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: 'JSON body missing' });
    }
    next();
};
exports.default = bodyValidator;
//# sourceMappingURL=body-validator.js.map