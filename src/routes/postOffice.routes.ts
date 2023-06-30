import { Router } from "express";
import PostOfficeController from "../controllers/postOffice.controller";

const postOfficeRouter = Router();

postOfficeRouter.get('/by-pincode', PostOfficeController.getPostOfficeByPincode);

export default postOfficeRouter;