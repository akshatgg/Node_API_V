import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import AccountController from "../controllers/accountancy/account.controller";

const accountancyRouter = Router();

accountancyRouter.get('/accounts/', verifyToken, AccountController.getAccountsByUser);

accountancyRouter.get('/accounts/account/:id', verifyToken, AccountController.getAccountById);

accountancyRouter.post('/accounts/create', verifyToken, AccountController.createAccount);

accountancyRouter.put('/accounts/update/:id', verifyToken, AccountController.createAccount);

accountancyRouter.delete('/accounts/delete/:id', verifyToken, AccountController.deleteAccount);

export default accountancyRouter;