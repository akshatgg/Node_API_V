import { Router } from "express";

import BusinessSettingController from "../controllers/BusinessSetting";
import verifyToken from "../middlewares/verify-token";
const businessSettingRouter = Router()

businessSettingRouter.post('/create', verifyToken, BusinessSettingController.createBusiness);
businessSettingRouter.get('/getAll', verifyToken, BusinessSettingController.findAllSetting);
businessSettingRouter.get('/getOne/:id', verifyToken, BusinessSettingController.getById);
businessSettingRouter.put('/update/:id', verifyToken, BusinessSettingController.update);
businessSettingRouter.delete('/delete/:id', verifyToken, BusinessSettingController.delete);

export default businessSettingRouter