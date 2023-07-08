import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import CalculatorController from "../controllers/sandbox/calculators.controller";
import bodyValidator from "../middlewares/body-validator";

const calculatorRoutes = Router();

calculatorRoutes.post('/income-tax/new-regime', verifyToken, bodyValidator, CalculatorController.incomeTaxNewRegime);

calculatorRoutes.post('/income-tax/old-regime', verifyToken, bodyValidator, CalculatorController.incomeTaxOldRegime);

calculatorRoutes.post('/advance-income-tax/old-regime', verifyToken, bodyValidator, CalculatorController.advanceIncomeTaxOldRegime);

calculatorRoutes.post('/advance-income-tax/new-regime', verifyToken, bodyValidator, CalculatorController.advanceIncomeTaxNewRegime);

export default calculatorRoutes;