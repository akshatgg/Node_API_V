import { Request, Response, Router } from "express";

import userRouter from "./user.routes";
import businessProfileRouter from "./businessProfile.routes";
import invoiceRouter from "./invoice.routes";

import profileRouter from "./profile.routes";
import pincodeRouter from "./pincode.routes";
import cmsRouter from "./cms.routes";
import postOfficeRouter from "./postOffice.routes";
import sandboxRouter from "./sandbox.routes";
import servicesRouter from "./services.routes";
import paymentsRouter from "./payments.routes";
import ordersRouter from "./orders.routes";

import libraryRouter from "./library.routes"
const router = Router();

router.use('/user', userRouter);

router.use('/business', businessProfileRouter);

router.use('/invoice', invoiceRouter);
router.use('/api',profileRouter)

router.use('/cms', cmsRouter);

router.use('/pincode', pincodeRouter);

router.use('/postOffice', postOfficeRouter);

router.use('/sandbox', sandboxRouter);

router.use('/services', servicesRouter);

router.use('/payments', paymentsRouter);

router.use('/orders', ordersRouter);
router.use('/library',libraryRouter)


router.get('/', (req, res) => {
    return res.send({ message: 'Up and running' });
});

const handlePageNotFound = (req: Request, res: Response) => {
    return res.status(404).send({ message: 'Endpoint not found' });
};

router.get('*', handlePageNotFound);

router.post('*', handlePageNotFound);

export default router;