import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import PanAadhaarController from "../controllers/sandbox/panAadhaar.controller";
import PanController from "../controllers/sandbox/pan.controller";

const panRouter = Router();

panRouter.get('/pan-aadhaar-link-status', verifyToken, PanAadhaarController.checkLinkStatus);

panRouter.get('/get-pan-details', verifyToken, PanController.getAdvancePanDetails);

export default panRouter;