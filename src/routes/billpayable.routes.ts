import { Router } from "express";

import BillPayableController from "../controllers/billpayable.controller";

const billPayableRouter = Router()

// create library
billPayableRouter.post('/create', BillPayableController.createBillPayable);
//find all library
billPayableRouter.get('/getAll', BillPayableController.findAllBillPayable);
// find library by id
billPayableRouter.get('/getOne/:id', BillPayableController.findOneBillPayable);
//  library update by id
billPayableRouter.put('/update/:id', BillPayableController.updateBill);
// library delete by id
billPayableRouter.delete('/delete/:id', BillPayableController.deleteBill);



export default billPayableRouter