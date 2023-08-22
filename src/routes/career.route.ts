import { Router } from 'express';
import CareerController from '../controllers/career.controller';
import { upload } from '../config/file-upload';
import verifyToken from '../middlewares/verify-token';
const careerRouter = Router();
//create career
careerRouter.post('/create', upload.single('cv'), verifyToken, CareerController.createCareer);
//find all career
careerRouter.get('/findAll', verifyToken, CareerController.findAllCareer);
// find library by id
careerRouter.get('/findOne/:id', verifyToken, CareerController.findOneCareer);
// delete career
careerRouter.delete('/delete/:id', verifyToken, CareerController.deleteCareer);

careerRouter.get('/getCv/:id', verifyToken, CareerController.getCVByCareerId);
export default careerRouter