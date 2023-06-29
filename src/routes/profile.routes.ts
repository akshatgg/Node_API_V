import { Router } from "express";

import ProfileController from "../controllers/profile.contrller";

const profileRouter = Router()

profileRouter.post('/addProfile',  ProfileController.createProfile);


profileRouter.get('/getAllProfile',  ProfileController.findAllProfile);

export default profileRouter