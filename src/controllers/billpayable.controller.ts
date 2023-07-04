import { Request, Response } from 'express';
import { prisma } from '../index';
import { Billpayable } from '@prisma/client'



// create bill

class BillPayableController {
    static async createBillPayable(req: Request, res: Response): Promise<void> {
        try {
            const {
                supplierName,
                supplierAddress,
                contact,
                billNumber,
                billDate,
                billAmount,
                billDiscription,
                paymentAmount,
                paymentMethod,
                paymentDate,
                dueDate,
                comment,
                transactionId,
                tax,
                invoiceNumber

            } = req.body;
            if (!billNumber || !supplierName || !billDate || !contact || !billAmount || !billDiscription ||
                !paymentMethod || !paymentAmount || !paymentDate || !dueDate || !tax || !supplierAddress) {
                res.status(400).send({ success: false, message: "plz provide all require body fields" });
                return
            }
            const bill: Billpayable = await prisma.billpayable.create({
                data: {
                    supplierName,
                    supplierAddress,
                    contact,
                    billNumber,
                    billDate,
                    billAmount,
                    billDiscription,
                    paymentAmount,
                    paymentMethod,
                    paymentDate,
                    dueDate,
                    comment,
                    transactionId,
                    tax,
                    invoiceNumber
                },
            });

            res.status(201).json({ message: 'Bill payable added successfully', result: bill });
        } catch (error) {
            //console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    // find All library
    static async findAllBillPayable(req: Request, res: Response): Promise<void> {
        try {
            const AllBillPayable = await prisma.billrecieve.findMany({});

            res.status(200).json({ success: true, AllBillPayable });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    //get library by id

    static async findOneBillPayable(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const OneBill: Billpayable | null = await prisma.billpayable.findFirst({
                where: {
                    id,
                },
            });

            if (!OneBill) {
                res.status(404).json({ success: false, message: 'bill  payable not found' });
                return;
            }

            res.status(200).json(OneBill);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    //bill update by id
    static async updateBill(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const {
                supplierName,
                supplierAddress,
                contact,
                billNumber,
                billDate,
                billAmount,
                billDiscription,
                paymentAmount,
                paymentMethod,
                paymentDate,
                dueDate,
                comment,
                transactionId,
                tax,
                invoiceNumber
            } = req.body;
            const updatedBill: Billpayable | null = await prisma.billpayable.update({
                where: { id: id },
                data: {
                    supplierName,
                    supplierAddress,
                    contact,
                    billNumber,
                    billDate,
                    billAmount,
                    billDiscription,
                    paymentAmount,
                    paymentMethod,
                    paymentDate,
                    dueDate,
                    comment,
                    transactionId,
                    tax,
                    invoiceNumber
                }
            })
            if (!updatedBill) {
                res.status(404).json({ sucess: false, message: 'bill not found' });
                return;
            }

            res.status(200).json({ sucess: true, updatedBill });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }

    }

    //delete library by id
    static async deleteBill(req: Request, res: Response): Promise<void> {
        try {
            const Id = parseInt(req.params.id);

            // Delete the profile
            const deletedBill: Billpayable | null = await prisma.billpayable.delete({ where: { id: Id } });

            if (!deletedBill) {
                res.status(404).json({ success: false, message: 'bill  not found' });
                return;
            }

            res.status(200).json({ success: true, deletedBill });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}





export default BillPayableController