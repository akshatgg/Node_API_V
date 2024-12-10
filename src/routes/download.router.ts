import express from "express";
import FinanceDataController from "../controllers/download.controller"; // Assuming the controller file is in the same directory

const router = express.Router();

// Routes for all API endpoints
router.get("/status-wise-income-tax-code", FinanceDataController.getStatusWiseIncomeTaxCode);
router.get("/pan-code", FinanceDataController.getPanCode);
router.get("/gold-silver-rate", FinanceDataController.getGoldSilverRate);
router.get("/interest-nsc", FinanceDataController.getInterestNSC);
router.get("/interest-ivp", FinanceDataController.getInterestIVP);
router.get("/interest-nsc-ix", FinanceDataController.getInterestNSCIX);
router.get("/depreciation-table", FinanceDataController.getDepreciationTable);
router.get("/interest-kvp", FinanceDataController.getInterestKVP);
router.get("/cost-inflation-index", FinanceDataController.getAll);
router.get("/cost-list-index", FinanceDataController.getcostlistindex);
router.get("/country-code-list", FinanceDataController.getcountrycodelist);

export default router;
