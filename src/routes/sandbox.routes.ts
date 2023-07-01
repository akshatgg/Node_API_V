import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import PanAadhaarController from "../controllers/sandbox/panAadhaar.controller";

const sandboxRouter = Router();

sandboxRouter.get('/pan-aadhaar-link-status', verifyToken, PanAadhaarController.checkLinkStatus);

export default sandboxRouter;