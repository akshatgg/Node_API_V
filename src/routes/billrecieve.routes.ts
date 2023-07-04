import { Router } from "express";

import BillRecieveController from "../controllers/billrecieve.controller";

const billRecieveRouter = Router()

// create library
billRecieveRouter.post('/create', BillRecieveController.createBillRecieve);
//find all library
billRecieveRouter.get('/getAll', BillRecieveController.findAllBillRecieve);
// find library by id
billRecieveRouter.get('/getOne/:id', BillRecieveController.findOneBillRecieve);
//  library update by id
billRecieveRouter.put('/update/:id', BillRecieveController.updateBill);
// library delete by id
billRecieveRouter.delete('/delete/:id', BillRecieveController.deleteBill);



export default billRecieveRouter