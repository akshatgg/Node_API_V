import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import PanAadhaarController from "../controllers/sandbox/panAadhaar.controller";

const panRouter = Router();

panRouter.get('/pan-aadhaar-link-status', verifyToken, PanAadhaarController.checkLinkStatus);

export default panRouter;