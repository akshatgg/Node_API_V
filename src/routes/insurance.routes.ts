import { Router } from "express";
import InsuranceController from "../controllers/insurance.controller";
import verifyToken from "../middlewares/verify-token";
import bodyValidator from "../middlewares/body-validator";

const router = Router();

router.post(
  "/apply",
  verifyToken,
  bodyValidator,
  InsuranceController.applyForInsurance
);

router.get(
  "/:id",
  verifyToken,
  InsuranceController.getInsuranceById
);

router.get(
  "/",
  verifyToken,
  InsuranceController.getInsuranceApplications
);

router.get(
  "/user/:id",
  verifyToken,
  InsuranceController.getInsuranceApplicationsByUser
);

export default router;
