import { Request, Response } from 'express';
import { prisma } from '../../index';
import { Ledger, MailingDetails, GSTDetails, BankingDetail } from '@prisma/client'



class ledgerController {

    static async createLadger(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = req.user!;
            const { name, under, mailingDetails, gstDetails, bankingDetails, openingBalance, creditBalance, debitBalance, date, currency, amount } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                res.status(404).json({ error: 'User not found' });
                return
            }
            const newLedger: Ledger = await prisma.ledger.create({
                data: {
                    name,
                    under,
                    openingBalance,
                    creditBalance,
                    debitBalance,
                    currency,
                    date,
                    amount,
                    userId,
                    mailingDetails: { create: mailingDetails }, // Create a new MailingDetails entry
                    gstDetails: { create: gstDetails }, // Create a new GSTDetails entry

                    bankingDetails: { create: bankingDetails }, // Create a new BankDetails entry
                },
                include: {
                    mailingDetails: true,
                    gstDetails: true,
                    bankingDetails: true,
                },
            });

            res.status(201).json({ result: newLedger, message: 'Sucessfull ledger created' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }


    //getAll ledger
    static async findAllLedger(req: Request, res: Response): Promise<void> {
        try {

            const allLedger: Ledger[] = await prisma.ledger.findMany({
                include: {
                    mailingDetails: true,
                    gstDetails: true,
                    bankingDetails: true,
                },
            });

            res.status(200).json({ success: true, allLedger });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }
    //get ledger by id
    static async getById(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;

            // Get the invoice by ID
            const ledger: Ledger | null = await prisma.ledger.findUnique({
                where: { id: parseInt(id) },
                include: {
                    mailingDetails: true,
                    gstDetails: true,
                    bankingDetails: true,
                },
            });

            if (!ledger) {
                res.status(404).json({ sucess: false, message: 'ledger not found' });
                return;
            }

            res.status(200).json(ledger);
        } catch (error) {
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }

    //update ledger 
    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, under, mailingDetails, gstDetails, bankingDetails, openingBalance, creditBalance, debitBalance, date, currency, amount } = req.body;
            const updatedLedger = await prisma.ledger.update({
                where: { id: parseInt(id) },

                data: {
                    name,
                    under,
                    openingBalance,
                    creditBalance,
                    debitBalance,
                    currency,
                    date,
                    amount,
                    mailingDetails: {
                        upsert: mailingDetails.map((mailingDetail: MailingDetails) => ({
                            where: { id: mailingDetail.id },
                            create: mailingDetail,
                            update: mailingDetail,
                        })),
                    },
                    gstDetails: {
                        upsert: gstDetails.map((gstDetail: GSTDetails) => ({
                            where: { id: gstDetail.id },
                            create: gstDetail,
                            update: gstDetail,
                        })),
                    },
                    bankingDetails: {
                        upsert: bankingDetails.map((bankingDetail: BankingDetail) => ({
                            where: { id: bankingDetail.id },
                            create: bankingDetail,
                            update: bankingDetail,
                        })),
                    },
                },
                include: {
                    mailingDetails: true,
                    gstDetails: true,
                    bankingDetails: true,
                },
            });

            res.status(200).json({ success: true, updatedLedger });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    //delete ledger
    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Delete related ExtraDetails first
            await prisma.mailingDetails.deleteMany({
                where: { mailingDetailsId: parseInt(id) },
            });

            await prisma.bankingDetail.deleteMany({
                where: { bankId: parseInt(id) },
            });

            await prisma.gSTDetails.deleteMany({
                where: { gstId: parseInt(id) },
            });




            const deletedLedger = await prisma.ledger.delete({
                where: { id: parseInt(id) },
                include: {
                    mailingDetails: true,
                    gstDetails: true,
                    bankingDetails: true,
                },
            });
            res.status(200).json({ success: true, deletedLedger, message: "ledger delete sucessfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }




    }
}
export default ledgerController