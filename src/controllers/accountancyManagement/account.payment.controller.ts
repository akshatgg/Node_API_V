import { Request, Response } from 'express';
import { prisma } from '../../index';
import { Acc_PaymentDetail, Acc_Payments, Bills } from '@prisma/client';

class paymentsController {

    static async createPayment(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = req.user!;
            const { date, partyRecipient, paymentDetails, bankOrCashLedger, billAllocation, narration,
                gstIn, taxAmount, taxCategories, AdditionalDetails } = req.body;


            const newPayment: Acc_Payments = await prisma.acc_Payments.create({
                data: {
                    date,
                    partyRecipient,
                    bankOrCashLedger,
                    narration,
                    gstIn, taxAmount,
                    taxCategories,
                    AdditionalDetails,
                    userId,
                    paymentDetails: { create: paymentDetails },
                    billAllocation: { create: billAllocation },


                },
                include: {

                    paymentDetails: true,
                    billAllocation: true,
                },
            });

            res.status(201).json({ result: newPayment, message: 'Sucessfull payment entry created' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }


    static async findAllPayment(req: Request, res: Response): Promise<void> {
        try {

            const allPayment: Acc_Payments[] = await prisma.acc_Payments.findMany({
                include: {
                    paymentDetails: true,
                    billAllocation: true,
                },
            });

            res.status(200).json({ success: true, message: 'payment find sucessfully', allPayment });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    static async getPaymentById(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;


            const payment: Acc_Payments | null = await prisma.acc_Payments.findUnique({
                where: { id: parseInt(id) },
                include: {
                    paymentDetails: true,
                    billAllocation: true,
                },
            });

            if (!payment) {
                res.status(404).json({ sucess: false, message: 'payment not found' });
                return;
            }

            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }


    static async updatePayment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { date, partyRecipient, paymentDetails, bankOrCashLedger, billAllocation, narration,
                gstIn, taxAmount, taxCategories, AdditionalDetails } = req.body;
            const updatedPayment: Acc_Payments = await prisma.acc_Payments.update({
                where: { id: parseInt(id) },

                data: {
                    date,
                    partyRecipient,
                    bankOrCashLedger,
                    narration,
                    gstIn, taxAmount,
                    taxCategories,
                    AdditionalDetails,

                    paymentDetails: {
                        upsert: paymentDetails.map((deta: Acc_PaymentDetail) => ({
                            where: { id: deta.id },
                            create: deta,
                            update: deta,
                        })),
                    },
                    billAllocation: {
                        upsert: billAllocation.map((bill: Bills) => ({
                            where: { id: bill.id },
                            create: bill,
                            update: bill,
                        })),
                    },
                },
                include: {
                    paymentDetails: true,
                    billAllocation: true,
                },
            });

            res.status(200).json({ success: true, updatedPayment });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async deletePayment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await prisma.acc_PaymentDetail.deleteMany({
                where: { paymentDetailId: parseInt(id) },
            });

            await prisma.bills.deleteMany({
                where: { billId: parseInt(id) },
            });


            const deletedPayment = await prisma.acc_Payments.delete({
                where: { id: parseInt(id) },
                include: {
                    paymentDetails: true,
                    billAllocation: true,
                },
            });
            res.status(200).json({ success: true, deletedPayment, message: "Payment entry delete sucessfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

}
export default paymentsController