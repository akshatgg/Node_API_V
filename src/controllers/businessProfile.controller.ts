import { Request, Response } from "express";
import { prisma } from "..";
import TokenService from "../services/token.service";
import { UserType } from "@prisma/client";

export default class BusinessProfileController {

    static async getProfile(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const { id } = TokenService.decodeToken(token!);
            
            const profile = await prisma.businessProfile.findFirst({ where: { id } });

            if(!profile) {
                return res.status(404).send({ success: false, message: 'Business Profile does not exists.' });
            }

            return res.status(200).send({ success: true, data: { profile } });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

    static async getProfileById(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const user = TokenService.decodeToken(token!);

            if(user.userType !== UserType.admin) {
                return res.status(403).send({ success: false, message: 'Unauthorized access' });
            }

            const { id } = req.body;
            
            const profile = await prisma.businessProfile.findFirst({ where: { id } });

            if(!profile) {
                return res.status(404).send({ success: false, message: 'Business Profile does not exists.' });
            }

            return res.status(200).send({ success: true, data: { profile } });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }
    
    static async update(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const { id } = TokenService.decodeToken(token!);

            const data = req.body;

            if(!data) {
                return res.status(400).send({ success: false, message: 'Business Profile data cannot be empty' });
            }

            if(!data.businessName) {
                return res.status(400).send({ success: false, message: 'Business Name cannot be empty' });
            }

            const user = await prisma.user.findFirst({ where: { id } });

            if(!user) {
                return res.status(404).send({ success: false, message: 'User does not exists' });
            }

            const found = await prisma.businessProfile.findFirst({
                where: {
                    id,
                    user
                },
            });

            if (!found) {
                await prisma.businessProfile.create({ data: { ...data, userId: id } });
            } else {
                await prisma.businessProfile.update({
                    where: {
                        id: found.id,
                    },
                    data: {
                        ...data,
                        userId: id,
                    }
                });
            }

            return res.status(200).send({ success: true, message: "Profile Updated" });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ success: false, message: 'Something went wrong' });
        }
    }

}