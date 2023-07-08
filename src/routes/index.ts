import { Request, Response, Router } from "express";

import userRouter from "./user.routes";
import businessProfileRouter from "./businessProfile.routes";
import invoiceRouter from "./invoice.routes";

import pincodeRouter from "./pincode.routes";
import cmsRouter from "./cms.routes";
import postOfficeRouter from "./postOffice.routes";
import servicesRouter from "./services.routes";
import paymentsRouter from "./payments.routes";
import ordersRouter from "./orders.routes";

import libraryRouter from "./library.routes"
import blogRouter from "./blog.routes";
import panRouter from "./pan.routes";
import gstRouter from "./gstin.routes";
import accountancyRouter from "./accountancy.routes";
import careerRouter from "./career.route"
import billRecieveRouter from "./billrecieve.routes";
import billPayableRouter from "./billpayable.routes";
import mcaRouter from "./mca.routes";
const router = Router();

router.use('/user', userRouter);

router.use('/business', businessProfileRouter);

router.use('/invoice', invoiceRouter);

router.use('/cms', cmsRouter);

router.use('/pincode', pincodeRouter);

router.use('/postOffice', postOfficeRouter);

router.use('/pan', panRouter);

router.use('/gst', gstRouter);

router.use('/services', servicesRouter);

router.use('/payments', paymentsRouter);

router.use('/orders', ordersRouter);

router.use('/library', libraryRouter);

router.use('/blog', blogRouter);

router.use('/accountancy', accountancyRouter);

router.use('/mca', mcaRouter);

router.use('/career', careerRouter);

router.use('/billrecieve', billRecieveRouter);

router.use('/billpayable', billPayableRouter);

router.get('/', (req, res) => {
    return res.send({ message: 'Up and running' });
});

const handlePageNotFound = (req: Request, res: Response) => {
    return res.status(404).send({ message: 'Endpoint not found' });
};

router.get('*', handlePageNotFound);

router.post('*', handlePageNotFound);

export default router;