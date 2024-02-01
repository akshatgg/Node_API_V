import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import OcrController from '../controllers/ocr.controller';
import { upload } from '../middlewares/multer.middleware';


const ocrRouter = Router();

ocrRouter.post('/pan',upload.single("file"), OcrController.getpandata);
// ocrRouter.get('/pan/:id', OcrController.Getuploadpandata);

export default ocrRouter;