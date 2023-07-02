"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adminCheck(req, res, next) {
    if (req.isAdmin) {
        return res.status(401).send({ success: false, message: 'Unauthorized Access. You must be an admin to perform this operation.' });
    }
    next();
}
exports.default = adminCheck;
//# sourceMappingURL=admin-check.js.map