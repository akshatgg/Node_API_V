import { Router } from "express";
import EinvoiceController from "../controllers/sandbox/ewaybill.controller";
import verifyToken from "../middlewares/verify-token";

const ewayInvoiceRouter = Router();

ewayInvoiceRouter.post('/generate', verifyToken, EinvoiceController.generateEinvoice);
ewayInvoiceRouter.post('/irn', verifyToken, EinvoiceController.einvoicebyirn);
ewayInvoiceRouter.post('/cancel', verifyToken, EinvoiceController.einvoiceCancel);
ewayInvoiceRouter.post('/pdf', verifyToken, EinvoiceController.generateEinvoicePdf);
ewayInvoiceRouter.post('/docdata', verifyToken, EinvoiceController.einvoicebydocumentdata);

export default ewayInvoiceRouter;