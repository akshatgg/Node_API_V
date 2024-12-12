import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import AadhaarController from "../controllers/sandbox/aadhaar.controller";
import bodyValidator from "../middlewares/body-validator";

const aadhaarRouter = Router();

aadhaarRouter.post('/verify', verifyToken, AadhaarController.verifyAadhaar);

aadhaarRouter.post('/aadhaar-generate-otp',verifyToken,bodyValidator,AadhaarController.aadharGenerateOtp)

aadhaarRouter.post('/aadhaar-verify-otp',verifyToken,bodyValidator,AadhaarController.aadhaarVerifyOtp)

export default aadhaarRouter;