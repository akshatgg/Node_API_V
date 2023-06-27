import { Router } from "express";
import UserController from "../controllers/user.controller";
import verifyToken from "../middlewares/verify-token";

const userRouter = Router();

userRouter.get('/profile/:id', UserController.getUserById);

userRouter.get('/get-all-users', verifyToken, UserController.getAllUsers);

userRouter.post('/sign-up', UserController.signUp);

userRouter.post('/login', UserController.login);

userRouter.post('/forgot-password', UserController.forgotPassword);

userRouter.post('/verify', UserController.verifyOtp);

userRouter.post('/send-otp', verifyToken, UserController.sendVerificationOtp);

userRouter.post('/change-password', verifyToken, UserController.changePassword);

userRouter.post('/update', verifyToken, UserController.updateProfile);

export default userRouter;