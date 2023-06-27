import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import BusinessProfileController from "../controllers/businessProfile.controller";

const businessProfileRouter = Router();

businessProfileRouter.post('/', verifyToken, BusinessProfileController.update);

businessProfileRouter.get('/profile', verifyToken, BusinessProfileController.getProfile);

businessProfileRouter.get('/profile/:id', verifyToken, BusinessProfileController.getProfileById);

export default businessProfileRouter;