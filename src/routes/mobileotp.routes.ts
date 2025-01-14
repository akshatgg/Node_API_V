import { Router } from "express";
import MobileOTPController from "../controllers/mobileotp.controller";
import verifyToken from "../middlewares/verify-token";

const mobileotpRouter = Router();

mobileotpRouter.post('/generateotpkey', MobileOTPController.generateOTPKey);
mobileotpRouter.get('/generateotpresend', MobileOTPController.generateresendkey);
mobileotpRouter.get('/generateotpverify', MobileOTPController.generateverifykey);
mobileotpRouter.post('/sendotp', MobileOTPController.sendOTP);
mobileotpRouter.post('/verifyotp', MobileOTPController.verifyOTP);
mobileotpRouter.post('/resendotp', MobileOTPController.resendOTP);
