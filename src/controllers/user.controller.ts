import { Request, Response } from "express";
import { prisma } from "..";
import { addMinutesToTime, generateOTP, validateEmail, validatePhone } from "../lib/util";
import bcrypt from 'bcrypt';
import EmailService from "../services/email.service";
import TokenService from "../services/token.service";
import { UserGender, UserType } from "@prisma/client";

export default class UserController {
    static SALT_ROUNDS = 10;

    static USERS_PER_PAGE = 10;

    static async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(UserController.SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    static async sendOtp(email: string, userId: number) {
        const otp = generateOTP();

        const { id: otp_key } = await prisma.otp.create({
            data: {
                otp,
                userId,
            }
        });

        const email_subject = "OTP: For Email Verification";

        const email_message = `Dear User, \n\n`
            + 'OTP for your email verification is : \n\n'
            + `${otp}\n\n`
            + 'This is a auto-generated email. Please do not reply to this email.\n\n'
            + 'Regards\n'
            + 'Itaxeasy\n\n';

        await EmailService.sendMail(email, email_subject, email_message);

        return otp_key;
    }

    static async signUp(req: Request, res: Response) {
        try {
            const { firstName, lastName, gender, email, password, phone } = req.body;

            if (!firstName.length) {
                return res.status(400).send({ success: false, message: "First name cannot be empty" });
            }

            if (!email || !validateEmail(email)) {
                return res.status(400).send({ success: false, message: "Please enter a valid email address" });
            }

            if (phone && !validatePhone(phone)) {
                return res.status(400).send({ success: false, message: "Please enter a valid phone number" });
            }

            if (!password && password.length >= 8) {
                return res.status(400).send({ success: false, message: "Password cannot be empty and must be atleas 8 characters long" });
            }

            if(!(gender in UserGender)) {
                return res.status(400).send({ success: false, message: "Please select a valid gender" });
            }

            const found = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { phone }
                    ]
                },
            });

            if (found) {
                return res.status(409).send({ success: false, message: "User with this email address or phone number already exists." });
            }

            const hash = await UserController.hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    gender,
                    password: hash,
                    phone,
                    verified: false,
                }
            });

            const otp_key = await UserController.sendOtp(email, user.id);

            return res.status(200).send({
                success: true,
                message:
                    `An OTP has been sent to your email "${email}".` +
                    `Verify your account by using that OTP`,
                data: {
                    user: {
                        id: user.id,
                        firstName,
                        lastName,
                        email,
                        phone
                    },
                    otp_key
                }
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return res.status(401).send({ success: false, message: 'User with this email does not exists' });
            }

            const authorized = await bcrypt.compare(password, user.password);

            if (!authorized) {
                return res.status(401).send({ success: false, message: 'Invalid credentials' });
            }

            const otp_key = await UserController.sendOtp(email, user.id);

            return res.status(200).send({
                success: true,
                message:
                    `An OTP has been sent to your email "${email}".` +
                    `Verify your account by using that OTP`,
                otp_key,
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return res.status(401).send({ success: false, message: 'User with this email does not exists' });
            }

            const otp_key = await UserController.sendOtp(email, user.id);

            return res.status(200).send({
                success: true,
                message:
                    `An OTP has been sent to your email "${email}".` +
                    `Verify your account by using that OTP`,
                otp_key,
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async verifyOtp(req: Request, res: Response) {
        try {
            const { email, otp_key, otp } = req.body;

            const id = parseInt(otp_key);

            if (!email || !validateEmail(email)) {
                return res.status(400).send({ success: false, message: "Please enter a valid email address" });
            }

            if (!otp_key) {
                return res.status(400).send({ success: false, message: 'OTP key is required for verification' });
            }

            const user = await prisma.user.findUnique({
                where: { email }, select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    address: true,
                    aadhaar: true,
                    pan: true,
                    email: true,
                    phone: true,
                    userType: true,
                    verified: true,
                    createdAt: true,
                }
            });

            if (!user) {
                return res.status(401).send({ success: false, message: 'User with this email does not exists' });
            }

            const otpInstance = await prisma.otp.findFirst({ where: { id, user, otp } });

            if (!otpInstance) {
                return res.status(401).send({ success: false, message: 'Invalid OTP' });
            }

            const now = new Date();

            const validTill = addMinutesToTime(otpInstance.createdAt, 15);

            if (otpInstance?.used || now > validTill) {
                return res.status(401).send({ success: false, message: 'This OTP has already been used or expired' });
            }

            if (!user.verified) {
                await prisma.user.update({ where: { id: user.id }, data: { verified: true } });
            }

            await prisma.otp.update({ where: { id }, data: { used: true } });

            const token = TokenService.generateToken(user);

            return res.status(200).send({
                success: true,
                message: 'OTP Verified',
                data: {
                    user,
                    token
                }
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async sendVerificationOtp(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const { id, email } = TokenService.decodeToken(token!);
            
            const otp_key = await UserController.sendOtp(email, id);

            return res.status(200).send({
                success: true,
                message:
                    `An OTP has been sent to your email "${email}".` +
                    `Verify your account by using that OTP`,
                otp_key,
            });
        } catch(e) {
            console.log(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async changePassword(req: Request, res: Response) {
        try {
            const { id } = req.user!;

            const { newPassword, otp, otp_key } = req.body;

            if(!newPassword && newPassword.length >= 8) {
                return res.status(400).send({ success: false, message: "Please provide a new password of atleast 8 characters" });
            }

            if(!otp || !otp_key) {
                return res.status(400).send({ success: false, message: "Not OTP Provided" });
            }

            const user = await prisma.user.findUnique({
                where: { id }
            });

            if (!user) {
                return res.status(401).send({ success: false, message: 'User does not exists' });
            }

            const otpInstance = await prisma.otp.findFirst({ where: { id: parseInt(otp_key), user, otp } });

            if (!otpInstance) {
                return res.status(401).send({ success: false, message: 'Invalid OTP' });
            }

            const now = new Date();

            const validTill = addMinutesToTime(otpInstance.createdAt, 15);

            if (otpInstance?.used || now > validTill) {
                return res.status(401).send({ success: false, message: 'This OTP has already been used or expired' });
            }

            const hash = await UserController.hashPassword(newPassword);

            await prisma.user.update({
                where: { id },
                data: {
                    password: hash
                }
            });

            return res.status(200).send({ success: true, message: 'Password changed' });
        } catch(e) {
            console.log(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async updateProfile(req: Request, res: Response) {
        try {
            const { id } = req.user!;

            const { firstName, lastName, pin, gender, address, aadhaar, pan, phone } = req.body;

            if (!firstName.length) {
                return res.status(400).send({ success: false, message: "First name cannot be empty" });
            }

            if (phone && !validatePhone(phone)) {
                return res.status(400).send({ success: false, message: "Please enter a valid phone number" });
            }

            const user = await prisma.user.findFirst({ where: { id } });

            if(!user) {
                return res.status(404).send({ success: false, message: 'User does not exists' });
            }

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    firstName,
                    lastName,
                    gender: gender ?? user.gender,
                    pin: pin ?? user.pin,
                    pan: pan ?? user.pan,
                    aadhaar: aadhaar ?? user.aadhaar,
                    address: address ?? user.address,
                    phone: phone ?? user.phone,
                }
            });

            return res.status(200).send({ success: true, message: "Profile Updated" });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = await prisma.user.findFirst({
                select: {
                    id: true,
                    createdAt: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    aadhaar: true,
                    address: true,
                    phone: true,
                    pan: true,
                    userType: true,
                },
                where: {
                    id: {
                        equals: parseInt(id)
                    }
                }
            });

            if (!user) {
                return res.status(404).send({ success: false, message: 'User not found' });
            }

            return res.status(200).send({ success: true, data: { user } });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const { page: pageNumber, order = 'desc' } = req.query;

            const page = parseInt((pageNumber as string) || '0');

            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    aadhaar: true,
                    address: true,
                    pan: true,
                    createdAt: true,
                    userType: true,
                },
                orderBy: {
                    createdAt: order === 'asc' ? 'asc' : 'desc',
                },
                skip: page * UserController.USERS_PER_PAGE,
                take: UserController.USERS_PER_PAGE,
            });

            return res.status(200).send({
                success: true,
                data: {
                    page,
                    users,
                },
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }
}