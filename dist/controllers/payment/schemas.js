"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = exports.transactionDateSchema = exports.refundSchema = exports.payoutSchema = void 0;
var zod_1 = require("zod");
var util_1 = require("../../lib/util");
exports.payoutSchema = zod_1.z.object({
    merchant_email: zod_1.z.string().email("Email validation failed. Please check and enter proper value for mail"),
    payout_date: zod_1.z.string({ required_error: "Mandatory Parameter payout_date can not empty" }),
});
exports.refundSchema = zod_1.z.object({
    txnid: zod_1.z.string({ required_error: "Mandatory Parameter txnid (Transaction ID) can not empty" }),
    merchant_email: zod_1.z.string().email("Mandatory Parameter email can not empty"),
    phone: zod_1.z.string().regex(util_1.PHONE_NUMBER_RGX, "Mandatory Parameter Phone can not be empty and must be valid"),
    amount: zod_1.z.string().regex(util_1.DECIMAL_RGX, "Mandatory Parameter amount can not empty and must be in decimal"),
    refund_amount: zod_1.z.string().regex(util_1.DECIMAL_RGX, "Mandatory Parameter  refund amount can not empty and must be in decimal"),
});
exports.transactionDateSchema = zod_1.z.object({
    merchant_email: zod_1.z.string().email("Email validation failed. Please check and enter proper value for mail"),
    transaction_date: zod_1.z.string({ required_error: "Mandatory Parameter transaction_date can not empty" }),
});
exports.transactionSchema = zod_1.z.object({
    phone: zod_1.z.string().length(10, "Mandatory Parameter Phone can not empty and must contain 10 digits"),
    txnid: zod_1.z.string({ required_error: "Mandatory Parameter txnid can not empty" }),
    amount: zod_1.z.string({ required_error: "Mandatory Parameter amount can not empty" })
        .regex(util_1.DECIMAL_RGX, "Mandatory Parameter must be in decimal"),
    email: zod_1.z.string().email("Mandatory Parameter email can not empty"),
});
//# sourceMappingURL=schemas.js.map