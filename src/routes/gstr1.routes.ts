import { Router } from "express";
import GSTR1Controller from "../controllers/gstr1.controller";
import verifyToken from "../middlewares/verify-token";

const gstr1Router = Router();

// GSTR1 _4A

gstr1Router.post("/4a-create",verifyToken,GSTR1Controller.create)

gstr1Router.get("/4a-getone/:id",verifyToken,GSTR1Controller.getsingle)

gstr1Router.post("/4a-update/:id",verifyToken,GSTR1Controller.update)

gstr1Router.get("/4a-getall",verifyToken,GSTR1Controller.getll)

gstr1Router.get("/4a-viewall",verifyToken,GSTR1Controller.getallview4A)

gstr1Router.get("/4a-getbygstn/:id",verifyToken,GSTR1Controller.getbygstin4A)

gstr1Router.delete("/4a-delete/:id",verifyToken,GSTR1Controller.delete)

// GSTR1- 5A

gstr1Router.post("/5a-create",verifyToken,GSTR1Controller.create5A)

gstr1Router.post("/5a-update/:id",verifyToken,GSTR1Controller.update5A)

gstr1Router.get("/5a-getall",verifyToken,GSTR1Controller.getall5A)

gstr1Router.delete("/5a-delete/:id",verifyToken,GSTR1Controller.delete5A)



export default gstr1Router;