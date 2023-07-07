"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutesToTime = exports.generateOTP = exports.validateGSTIN = exports.validatePhone = exports.validateEmail = void 0;
var GSTIN_RGX = /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[CZ]{1}[0-9a-zA-Z]{1}$|^[0-9]{4}[a-zA-Z]{3}[0-9]{5}[uUnN]{2}[0-9a-zA-Z]{1}$/;
var EMAIL_RGX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var PHONE_NUMBER_RGX = /^(\+\d{1,3})?(\d{10})$/;
var validateEmail = function (email) { return EMAIL_RGX.test(email); };
exports.validateEmail = validateEmail;
var validatePhone = function (phone) { return PHONE_NUMBER_RGX.test(phone); };
exports.validatePhone = validatePhone;
var validateGSTIN = function (gstin) {
    if (!gstin) {
        return false;
    }
    return GSTIN_RGX.test(gstin);
};
exports.validateGSTIN = validateGSTIN;
function generateOTP() {
    var minOTPValue = 100000; // Minimum value for a 6-digit OTP
    var maxOTPValue = 999999; // Maximum value for a 6-digit OTP
    var otp = Math.floor(Math.random() * (maxOTPValue - minOTPValue + 1)) + minOTPValue;
    return otp.toString();
}
exports.generateOTP = generateOTP;
function addMinutesToTime(date, minutes) {
    var newTime = new Date(date.getTime() + minutes * 60000);
    return newTime;
}
exports.addMinutesToTime = addMinutesToTime;
//# sourceMappingURL=util.js.map