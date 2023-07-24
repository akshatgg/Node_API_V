import { Router } from "express";
import verifyToken from '../middlewares/verify-token';
import LedgerController from "../controllers/accountancyManagement/account.ledger.controller";
import JournalController from "../controllers/accountancyManagement/account.journal.controller";

const accountancyRouter = Router()

// ledger
accountancyRouter.post('/create', verifyToken, LedgerController.createLadger);
accountancyRouter.get('/getAll', verifyToken, LedgerController.findAllLedger);
accountancyRouter.get('/getOne/:id', verifyToken, LedgerController.getById);
accountancyRouter.put('/update/:id', verifyToken, LedgerController.update);
accountancyRouter.delete('/delete/:id', verifyToken, LedgerController.delete);

// journal
accountancyRouter.post('/createJournal', verifyToken, JournalController.createJournal);
accountancyRouter.get('/getAllJournal', verifyToken, JournalController.findAllJournal);
accountancyRouter.get('/getOneJournal/:id', verifyToken, JournalController.getJournalById);
accountancyRouter.put('/updatejournal/:id', verifyToken, JournalController.updateJournal);
accountancyRouter.delete('/deletejournal/:id', verifyToken, JournalController.deleteJournal);
export default accountancyRouter