import { Router } from "express";
import GSTController from "../controllers/sandbox/gst.controller";

const gstRouter = Router();

gstRouter.get('/search-by-gstin', GSTController.searchByGSTIN);

export default gstRouter;