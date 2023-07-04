import { Request, Response } from 'express';
import { prisma } from '../index';
import { Billrecieve } from '@prisma/client'



// create bill

class BillRecieveController {
    static async createBillRecieve(req: Request, res: Response): Promise<void> {
        try {
            const {
                billNumber,
                amount,
                tax,
                customerName,
                customerAddress,
                contact,
                itemQuantity,
                itemPrice,
                itemDescription,
                paymentStatus,
                paymentMethod,
                dueDate,
                comment,

            } = req.body;
            if (!billNumber || !amount || !tax || !customerName || !contact || !itemQuantity || !itemPrice ||
                !itemDescription || !paymentStatus || !paymentMethod || !dueDate) {
                res.status(400).send({ success: false, message: "plz provide all require body fields" });
                return
            }
            const bill: Billrecieve = await prisma.billrecieve.create({
                data: {
                    billNumber,
                    amount,
                    tax,
                    customerName,
                    customerAddress,
                    contact,
                    itemQuantity,
                    itemPrice,
                    itemDescription,
                    paymentStatus,
                    paymentMethod,
                    dueDate,
                    comment,

                },
            });

            res.status(201).json({ message: 'Bill Recieve added successfully', result: bill });
        } catch (error) {
            //console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    // find All library
    static async findAllBillRecieve(req: Request, res: Response): Promise<void> {
        try {
            const AllBillRecieve = await prisma.billrecieve.findMany({});

            res.status(200).json({ success: true, AllBillRecieve });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    //get library by id

    static async findOneBillRecieve(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const OneBill: Billrecieve | null = await prisma.billrecieve.findFirst({
                where: {
                    id,
                },
            });

            if (!OneBill) {
                res.status(404).json({ success: false, message: 'bill  recieve not found' });
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
                billNumber,
                amount,
                tax,
                customerName,
                customerAddress,
                contact,
                itemQuantity,
                itemPrice,
                itemDescription,
                paymentStatus,
                paymentMethod,
                dueDate,
                comment,
            } = req.body;
            const updatedBill: Billrecieve | null = await prisma.billrecieve.update({
                where: { id: id },
                data: {
                    billNumber,
                    amount,
                    tax,
                    customerName,
                    customerAddress,
                    contact,
                    itemQuantity,
                    itemPrice,
                    itemDescription,
                    paymentStatus,
                    paymentMethod,
                    dueDate,
                    comment,
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
            const deletedBill: Billrecieve | null = await prisma.billrecieve.delete({ where: { id: Id } });

            if (!deletedBill) {
                res.status(404).json({ success: false, message: 'bill not found' });
                return;
            }

            res.status(200).json({ success: true, deletedBill });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}





export default BillRecieveController