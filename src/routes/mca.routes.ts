import { Router } from "express";
import MCAController from "../controllers/sandbox/mca.controller";
import verifyToken from "../middlewares/verify-token";

const mcaRouter = Router();

mcaRouter.get('/company-details', verifyToken, MCAController.getCompanyByCIN);

export default mcaRouter;