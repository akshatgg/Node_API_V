"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queryValidator = function (requiredParams) { return function (req, res, next) {
    var keys = Object.keys(req.query);
    var missingParams = requiredParams.filter(function (param) { return !keys.includes(param); });
    if (missingParams.length) {
        var message = "Required Query Params ".concat(missingParams.join(', '), " are missing.");
        return res.status(400).json({ success: false, message: message });
    }
    next();
}; };
exports.default = queryValidator;
//# sourceMappingURL=query-validator.js.map