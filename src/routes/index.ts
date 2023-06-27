import { Request, Response, Router } from "express";
import userRouter from "./user.routes";
import businessProfileRouter from "./businessProfile.routes";

const router = Router();

router.use('/user', userRouter);

router.use('/business', businessProfileRouter);

router.get('/', (req, res) => {
    return res.send({ message: 'Up and running' });
});

const handlePageNotFound = (req: Request, res: Response) => {
    return res.status(404).send({ message: 'Endpoint not found' });
};

router.get('*', handlePageNotFound);

router.post('*', handlePageNotFound);

export default router;