const EMAIL_RGX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PHONE_NUMBER_RGX = /^(\+\d{1,3})?(\d{10})$/;

export const validateEmail = (email: string): boolean => EMAIL_RGX.test(email);

export const validatePhone = (phone: string): boolean => PHONE_NUMBER_RGX.test(phone);

export function generateOTP() {
  const minOTPValue = 100000; // Minimum value for a 6-digit OTP
  const maxOTPValue = 999999; // Maximum value for a 6-digit OTP

  const otp = Math.floor(Math.random() * (maxOTPValue - minOTPValue + 1)) + minOTPValue;

  return otp.toString();
}

export function addMinutesToTime(date: Date, minutes: number) {
  const newTime = new Date(date.getTime() + minutes * 60000);
  return newTime;
}