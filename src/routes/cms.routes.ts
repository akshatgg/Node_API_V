import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import CMSController from "../controllers/cms.controller";

const cmsRouter = Router();

cmsRouter.get('/homescreen', CMSController.getHomeScreen);

cmsRouter.get('/total-users', CMSController.getUserCount);

cmsRouter.post('/main-heading', verifyToken, CMSController.updateMainHeading);

cmsRouter.post('/sub-heading', verifyToken, CMSController.updateSubHeading);

cmsRouter.post('/navcards', verifyToken, CMSController.updateNavCards);

cmsRouter.post('/button', verifyToken, CMSController.updateButton);

export default cmsRouter;