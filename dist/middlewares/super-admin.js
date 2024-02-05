"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SuperadminCheck(req, res, next) {
    if (!req.isAdmin) {
        return res.status(401).send({ success: false, message: 'Unauthorized Access. You must be an admin to perform this operation.' });
    }
    next();
}
exports.default = SuperadminCheck;
//# sourceMappingURL=super-admin.js.map