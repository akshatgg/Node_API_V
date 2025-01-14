import { Router } from "express";
import ewaybill from "../controllers/sandbox/ewaybill.controller";
import verifyToken from "../middlewares/verify-token";

const ewaybill = Router();

ewaybill.post('/generate', verifyToken, ewaybill.generateEwaybill);
