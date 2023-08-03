import { Request, Response } from 'express';
import { prisma } from '../index';
import { Visitor } from '@prisma/client'

export class VisitorCounterController {

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const existingVisitor = await prisma.visitor.findFirst();
            if (existingVisitor) {
                await prisma.visitor.update({
                    where: { id: existingVisitor.id },
                    data: { count: existingVisitor.count + 1 },
                });
            } else {
                await prisma.visitor.create({ data: { count: 1 } });
            }

            // Respond with the updated count
            const updatedVisitor = await prisma.visitor.findFirst();

            res.status(200).json({ count: updatedVisitor!.count });
        } catch (error) {

            res.status(500).json({ error: "Error incrementing visitor count" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const totalVisitors = await prisma.visitor.aggregate({
                _sum: {
                    count: true,
                },
            });
            const totalCount = totalVisitors._sum.count ?? 0;
            res.json({ count: totalCount });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error fetching visitors" });
        }
    }


}