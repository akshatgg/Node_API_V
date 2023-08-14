import { Request, Response } from 'express';
import { prisma } from '../index';
import { RegisterStartup } from '@prisma/client'
export class RegisterStartupController {

    static async RegisterStartup(req: Request, res: Response): Promise<void> {
        try {
            const image: string = req.file?.path as string
            const { title,categories } = req.body
            const { id: userId } = req.user!;

            if (!title) {
                res.status(400).json({ success: false, message: 'Required Query title name was not provided' });
                return
            }
            if (!image) {
                res.status(400).json({ success: false, message: 'Required Query image was not provided' });
                return
            }
            if (!categories) {
                res.status(400).json({ success: false, message: 'Required Query categories was not provided' });
                return
            }

            const existingUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                res.status(404).json({ error: 'User not found' });
                return
            }
            const newRegisterStarup: RegisterStartup = await prisma.registerStartup.create({
                data: {
                    title, image, userId,categories
                }
            })
            res.status(201).json({ result: newRegisterStarup, message: 'Sucessfull Register Startup Setting created' });
        } catch (error) {

            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    static async findAllStartup(req: Request, res: Response): Promise<void> {
        try {
            const AllStartup = await prisma.registerStartup.findMany({});

            res.status(200).json({ success: true, AllStartup });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;

            // Get the invoice by ID
            const Startup: RegisterStartup | null = await prisma.registerStartup.findUnique({
                where: { id: parseInt(id) },

            });

            if (!Startup) {
                res.status(404).json({ sucess: false, message: 'Startup not found' });
                return;
            }

            res.status(200).json(Startup);
        } catch (error) {
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedStartup = await prisma.registerStartup.delete({
                where: { id: parseInt(id) },

            });
            res.status(200).json({ success: true, deletedStartup, message: "Register Startup deleted sucessfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }




    }

}