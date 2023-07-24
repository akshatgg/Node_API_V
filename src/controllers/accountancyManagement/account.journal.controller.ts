import { Request, Response } from 'express';
import { prisma } from '../../index';
import { ExtraDetails, JournalEntry, GstInformation } from '@prisma/client'

class JournalController {
    static async createJournal(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = req.user!;
            const { date,
                debitAmount,
                creditAmount,
                particular, currency,
                narration, extraDetail, gstInformation } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                res.status(404).json({ error: 'User not found' });
                return
            }
            const newJournal: JournalEntry = await prisma.journalEntry.create({
                data: {
                    date,
                    debitAmount,
                    creditAmount,
                    particular,
                    currency,
                    narration,
                    userId,
                    extraDetail: { create: extraDetail },
                    gstInformation: { create: gstInformation },

                },
                include: {
                    extraDetail: true,
                    gstInformation: true,
                },
            });

            res.status(201).json({ result: newJournal, message: 'Sucessfull journal created' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }


    static async findAllJournal(req: Request, res: Response): Promise<void> {
        try {

            const allJournal: JournalEntry[] = await prisma.journalEntry.findMany({
                include: {
                    extraDetail: true,
                    gstInformation: true,
                },
            });

            res.status(200).json({ success: true, allJournal });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    static async getJournalById(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;


            const ledger: JournalEntry | null = await prisma.journalEntry.findUnique({
                where: { id: parseInt(id) },
                include: {
                    extraDetail: true,
                    gstInformation: true,
                },
            });

            if (!ledger) {
                res.status(404).json({ sucess: false, message: 'journal not found' });
                return;
            }

            res.status(200).json(ledger);
        } catch (error) {
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }


    static async updateJournal(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { date,
                debitAmount,
                creditAmount,
                particular, currency,
                narration, extraDetail, gstInformation } = req.body;
            const updatedJournal: JournalEntry = await prisma.journalEntry.update({
                where: { id: parseInt(id) },

                data: {
                    date,
                    debitAmount,
                    creditAmount,
                    particular,
                    currency,
                    narration,
                    extraDetail: {
                        upsert: extraDetail.map((extra: ExtraDetails) => ({
                            where: { id: extra.id },
                            create: extra,
                            update: extra,
                        })),
                    },
                    gstInformation: {
                        upsert: gstInformation.map((gst: GstInformation) => ({
                            where: { id: gst.id },
                            create: gst,
                            update: gst,
                        })),
                    },
                },
                include: {
                    extraDetail: true,
                    gstInformation: true,
                },
            });




            res.status(200).json({ success: true, updatedJournal });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async deleteJournal(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Delete related ExtraDetails first
            await prisma.extraDetails.deleteMany({
                where: { extraDetailsId: parseInt(id) },
            });

            await prisma.gstInformation.deleteMany({
                where: { gstInformationId: parseInt(id) },
            });


            const deletedJournal = await prisma.journalEntry.delete({
                where: { id: parseInt(id) },
                include: {
                    extraDetail: true,
                    gstInformation: true,
                },
            });
            res.status(200).json({ success: true, deletedJournal, message: "journal entry delete sucessfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

}
export default JournalController