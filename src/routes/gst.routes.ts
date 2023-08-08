import { Router } from "express";
import GSTController from "../controllers/sandbox/gst.controller";
import verifyToken from "../middlewares/verify-token";
import bodyValidator from "../middlewares/body-validator";

const gstRouter = Router();

gstRouter.get('/search/gstin/:gstin', verifyToken, GSTController.searchByGSTIN);

gstRouter.get('/search/gstin-by-pan', verifyToken, GSTController.searchGSTINNumberByPan);

gstRouter.post('/return/track', verifyToken, bodyValidator, GSTController.trackGSTReturn);

gstRouter.post('/tax-payer/registration', verifyToken, bodyValidator, GSTController.registerForGST);

gstRouter.post('/tax-payer/generate-otp', verifyToken, bodyValidator, GSTController.generateOTP);

gstRouter.post('/tax-payer/verify-otp', verifyToken, bodyValidator, GSTController.verifyOTP);

gstRouter.post('/tax-payer/file/proceed', verifyToken, bodyValidator, GSTController.proceedToFileGstr);

gstRouter.post('/tax-payer/file/gstr-4', verifyToken, bodyValidator, GSTController.uploadGSTR4);

gstRouter.post('/tax-payer/file/gstr-3b', verifyToken, bodyValidator, GSTController.uploadGSTR3B);

export default gstRouter;
