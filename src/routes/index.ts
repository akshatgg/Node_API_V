import { Request, Response, Router } from "express";

import userRouter from "./user.routes";
import businessProfileRouter from "./businessProfile.routes";
import invoiceRouter from "./invoice.routes";
<<<<<<< HEAD
import profileRouter from "./profile.routes";
=======
import pincodeRouter from "./pincode.routes";
import cmsRouter from "./cms.routes";
import postOfficeRouter from "./postOffice.routes";
>>>>>>> 2a1e88ebe1e5bd6506b75792392bb5d9e10da96a

const router = Router();

router.use('/user', userRouter);

router.use('/business', businessProfileRouter);

router.use('/invoice', invoiceRouter);

<<<<<<< HEAD
router.use('/api',profileRouter)
=======
router.use('/cms', cmsRouter);

router.use('/pincode', pincodeRouter);

router.use('/postOffice', postOfficeRouter);
>>>>>>> 2a1e88ebe1e5bd6506b75792392bb5d9e10da96a

router.get('/', (req, res) => {
    return res.send({ message: 'Up and running' });
});

const handlePageNotFound = (req: Request, res: Response) => {
    return res.status(404).send({ message: 'Endpoint not found' });
};

router.get('*', handlePageNotFound);

router.post('*', handlePageNotFound);

export default router;