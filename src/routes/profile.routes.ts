import { Router } from "express";

import ProfileController from "../controllers/profile.contrller";

const profileRouter = Router()

// create profile
profileRouter.post('/addProfile',  ProfileController.createProfile);
// find all profile
profileRouter.get('/getAllProfile',  ProfileController.findAllProfile);
// find profile by id
profileRouter.get('/getOneProfile/:id',  ProfileController.findOneProfile);
//  profile update by id
profileRouter.put('/updateProfile/:id',  ProfileController.updateProfile);
//profile delete by id
profileRouter.delete('/deleteProfile/:id',  ProfileController.deleteProfile);

export default profileRouter