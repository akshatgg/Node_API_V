import { Request, Response } from 'express';
import { prisma } from '../index';
import { Career } from '@prisma/client'


export default class CareerController {
    //create career
    static async createCareer(req: Request, res: Response): Promise<void> {
        try {
            const cv: string = req.file?.path as string
            const { name, address, pin, email, mobile, skills, gender, careerId } = req.body
            if (!cv) {
                res.status(400).send({ success: false, message: "cv is missing" });
                return
            }
            if (!name || !address || !pin || !email || !mobile || !skills || !gender || !careerId) {
                res.status(400).send({ success: false, message: "plz provide all require body fields" });
                return
            }

            //  const { id: careerId } = req.user!
            const bill: Career = await prisma.career.create({
                data: {
                    name, address, pin, email, mobile, skills, gender, cv, careerId
                }
            });

            res.status(201).json(bill);
            return

        } catch (error) {
            console.log(error);
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }
    //getAll career
    static async findAllCareer(req: Request, res: Response): Promise<void> {
        try {
            const allCareer = await prisma.career.findMany({});

            res.status(200).json({ success: true, allCareer });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }
    //find one career
    static async findOneCareer(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const { id: careerId } = req.user!
            const Career: Career | null = await prisma.career.findFirst({
                where: {
                    id: careerId
                },
            });

            if (!Career) {
                res.status(404).json({ success: false, message: 'career not found' });
                return;
            }

            res.status(200).json(Career);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    //delete career by id
    static async deleteCareer(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            // const { id: careerId } = req.user!
            // Delete the career
            const deletedCareer: Career | null = await prisma.career.delete({ where: { id } });

            if (!deletedCareer) {
                res.status(404).json({ success: false, message: 'career not found' });
                return;
            }

            res.status(200).json({ success: true, deletedCareer });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

