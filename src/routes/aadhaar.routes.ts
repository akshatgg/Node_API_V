import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import queryValidator from "../middlewares/query-validator";
import AadhaarController from "../controllers/sandbox/aadhaar.controller";

const aadhaarRouter = Router();

aadhaarRouter.get('/verify', verifyToken, queryValidator(['aadhaar_number']), AadhaarController.verifyAadhaar);

export default aadhaarRouter;