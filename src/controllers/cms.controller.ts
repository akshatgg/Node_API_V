import { Request, Response } from "express";

import cards from '../config/cards.json';
import TokenService from "../services/token.service";
import { writeFile } from "fs/promises";
import { prisma } from "..";

export default class CMSController {

    static cardFilePath = '../config/cards.json';

    static async updateCards(cards: object) {
        await writeFile(CMSController.cardFilePath, JSON.stringify(cards));
    }

    static getHomeScreen(req: Request, res: Response) {
        try {
            return res.status(200).json({
                success: true,
                data: cards
            });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

    static async updateMainHeading(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const { userType } = TokenService.decodeToken(token!);

            if(userType !== 'admin' && userType !== 'developer') {
                return res.status(403).json({ success: false, message: 'Unauthorized access' });
            }

            const { mainHeading } = req.body;

            cards.home.upper.mainHeading = mainHeading;

            await CMSController.updateCards(cards);

            return res.status(200).json({ 
                success: true, 
                message: 'Main Heading Updated', 
                data: cards.home 
            });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

    static async updateSubHeading(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const { userType } = TokenService.decodeToken(token!);

            if(userType !== 'admin' && userType !== 'developer') {
                return res.status(403).json({ success: false, message: 'Unauthorized access' });
            }

            const { subHeading } = req.body;

            cards.home.upper.subHeading = subHeading;

            await CMSController.updateCards(cards);

            return res.status(200).json({ 
                success: true, 
                message: 'Sub Heading Updated', 
                data: cards.home 
            });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

    static async updateButton(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const { userType } = TokenService.decodeToken(token!);

            if(userType !== 'admin' && userType !== 'developer') {
                return res.status(403).json({ success: false, message: 'Unauthorized access' });
            }

            const { button } = req.body;

            cards.home.upper.button = button;

            await CMSController.updateCards(cards);

            return res.status(200).json({ 
                success: true, 
                message: 'Button Updated', 
                data: cards.home 
            });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

    static async updateNavCards(req: Request, res: Response) {
        try {
            const token = TokenService.getTokenFromAuthHeader(req.headers.authorization);

            const { userType } = TokenService.decodeToken(token!);

            if(userType !== 'admin' && userType !== 'developer') {
                return res.status(403).json({ success: false, message: 'Unauthorized access' });
            }

            const { navcards } = req.body;

            cards.home.navcards = navcards;

            await CMSController.updateCards(cards);

            return res.status(200).json({ 
                success: true, 
                message: 'Navcards Updated', 
                data: cards.home 
            });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

    static async getUserCount(req: Request, res: Response) {
        try {
            const count = await prisma.user.count();

            return res.status(200).json({ success: true, count });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

}