import { Router } from "express";
import UserController from "../controllers/user.controller";
import verifyToken from "../middlewares/verify-token";
import adminCheck from "../middlewares/admin-check";
import SuperadminCheck from "../middlewares/super-admin";
import { upload } from "../config/file-upload";

const userRouter = Router();

userRouter.get('/profile', verifyToken, UserController.getOwnProfile);

userRouter.get('/profile/:id', verifyToken, UserController.getUserById);

userRouter.get('/get-all-users', SuperadminCheck, UserController.getAllUsers);

userRouter.post('/sign-up', UserController.signUp);

userRouter.post('/sign-up-admin',SuperadminCheck, UserController.makeadmin);

userRouter.post('/sign-up-agent',verifyToken,adminCheck, UserController.makeagent);

userRouter.get('/get-all-users', SuperadminCheck, UserController.getAllUsers);

userRouter.get('/get-all-agents', verifyToken,adminCheck, UserController.getallagentsbyadmin);

userRouter.get('/get-all-admins', SuperadminCheck, UserController.getalladminsforsuperadmin);

userRouter.post('/login', UserController.login);

userRouter.get("/gettoken", UserController.gettoken)

userRouter.post('/changeusertype',verifyToken, UserController.changeusertype);

userRouter.post('/forgot-password', UserController.forgotPassword);

userRouter.post('/verify', UserController.verifyOtp);

userRouter.post('/resendotp', UserController.resendotp);

userRouter.post('/send-otp', verifyToken, UserController.sendVerificationOtp);

userRouter.post('/change-password', verifyToken, UserController.changePassword);

userRouter.post('/update',upload.single('avatar'), verifyToken, UserController.updateProfile);

export default userRouter;
