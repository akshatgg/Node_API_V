"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutesToTime = exports.generateOTP = exports.validatePhone = exports.validateEmail = void 0;
var EMAIL_RGX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var PHONE_NUMBER_RGX = /^(\+\d{1,3})?(\d{10})$/;
var validateEmail = function (email) { return EMAIL_RGX.test(email); };
exports.validateEmail = validateEmail;
var validatePhone = function (phone) { return PHONE_NUMBER_RGX.test(phone); };
exports.validatePhone = validatePhone;
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