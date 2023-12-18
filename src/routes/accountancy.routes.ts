import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import bodyValidator from "../middlewares/body-validator";
import { LedgerController } from "../controllers/accountancy.controller";

const accountancyRouter = Router();

const ledgerRouter = Router();

ledgerRouter.post('/create', verifyToken, bodyValidator, LedgerController.createLedger);

ledgerRouter.get('/id/:ledgerId', verifyToken, LedgerController.getLedgerById);

ledgerRouter.get('/party/:partyId', verifyToken, LedgerController.getLedgerByPartyId);

ledgerRouter.get('/all', verifyToken, LedgerController.getLedgers);

accountancyRouter.use('/ledger', ledgerRouter);

export default accountancyRouter;
