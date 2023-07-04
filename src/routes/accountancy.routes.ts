import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import AccountController from "../controllers/accountancy/account.controller";

const accountancyRouter = Router();

accountancyRouter.get('/accounts/', verifyToken, AccountController.getAccountsByUser);

accountancyRouter.get('/accounts/account/:id', verifyToken, AccountController.getAccountById);

accountancyRouter.post('/accounts/create', verifyToken, AccountController.createAccount);

accountancyRouter.post('/accounts/update', verifyToken, AccountController.createAccount);

accountancyRouter.post('/accounts/delete', verifyToken, AccountController.deleteAccount);

export default accountancyRouter;