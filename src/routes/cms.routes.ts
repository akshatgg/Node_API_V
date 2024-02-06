import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import CMSController from "../controllers/cms.controller";
import adminCheck from "../middlewares/admin-check";

const cmsRouter = Router();

cmsRouter.get('/homescreen', CMSController.getHomeScreen);

cmsRouter.get('/total-users', CMSController.getUserCount);

cmsRouter.get('/stats', verifyToken, adminCheck, CMSController.getStats);

cmsRouter.get('/mailing-list', verifyToken, adminCheck, CMSController.getMailingList);

cmsRouter.get('/phone-list', verifyToken, adminCheck, CMSController.getPhoneList);

cmsRouter.post('/main-heading-content', verifyToken, adminCheck, CMSController.updateMainHeadingcontent);

cmsRouter.post('/navcards', verifyToken, adminCheck, CMSController.updateNavCards);

cmsRouter.post('/ongoingprojects', verifyToken, adminCheck, CMSController.updateOnGoingprojects);

cmsRouter.post('/corporateprojects', verifyToken, adminCheck, CMSController.updateOnGoingprojects);


export default cmsRouter;
