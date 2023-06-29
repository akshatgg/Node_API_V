import { Router } from "express";
import PincodeController from "../controllers/pincode.controller";

const pincodeRouter = Router();

pincodeRouter.get('/info-by-pincode', PincodeController.getInfoByPincode);

pincodeRouter.get('/pincode-by-city', PincodeController.getPincodeByCity);

export default pincodeRouter;