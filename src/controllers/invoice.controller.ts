import { Request, Response } from 'express';
import { Invoice, InvoiceItem, Item, Party } from '@prisma/client';
import { prisma } from '../index';

class InvoiceController {

    static async create(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;
    
            // Create the invoice
            const { invoiceNumber, type, partyId, phone, partyName, totalAmount, totalGst, stateOfSupply, cgst, sgst, igst, utgst, details, extraDetails, items, modeOfPayment, credit = false } = req.body;
    
            if(partyId) {
                const party = await prisma.party.findUnique({ where: { id: partyId } });
    
                if(!party) {
                    return res.status(401).json({ sucess: false, message: 'Party not found' });
                }
            }
    
            const invoice: Invoice = await prisma.invoice.create({
                data: {
                    invoiceNumber,
                    type,
                    party: {
                        connect: { id: partyId } // Connect an existing party by ID
                    },
                    phone,
                    partyName,
                    totalAmount,
                    totalGst,
                    stateOfSupply,
                    cgst,
                    sgst,
                    igst,
                    utgst,
                    details,
                    extraDetails,
                    modeOfPayment,
                    credit,
                    items: {
                        create: items.map(({ id, quantity } : { id: string, quantity: number }) => ({
                            item: { connect: { id } },
                            quantity
                        })),
                    },
                    user: {
                        connect: { id: userId } // Connect the user by ID
                    },
                },
            });
    
            return res.status(201).json(invoice);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }    

    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = req.user!;

            // Pagination parameters
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = parseInt(page.toString(), 10);
            const parsedLimit = parseInt(limit.toString(), 10);

            // Calculate the offset based on the page and limit
            const offset = (parsedPage - 1) * parsedLimit;

            // Get all invoices for the user with pagination
            const invoices: Invoice[] = await prisma.invoice.findMany({
                where: { userId },
                skip: offset,
                take: parsedLimit,
                include:{
                    items:true
                }
            });

            res.status(200).json({ success: true, invoices });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const invoiceId = req.params.id;

            // Get the invoice by ID
            const invoice: Invoice | null = await prisma.invoice.findUnique({ where: { id: invoiceId } ,
                include:{
                    items:true
                }
            });

            if (!invoice) {
                res.status(404).json({ sucess: false, message: 'Invoice not found' });
                return;
            }

            res.status(200).json(invoice);
        } catch (error) {
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const invoiceId = req.params.id;
            const { invoiceNumber, type, partyId, phone, partyName, totalAmount, totalGst, stateOfSupply, cgst, sgst, igst, utgst, details, extraDetails, items } = req.body;

            const { id: userId } = req.user!;

            const invoice = await prisma.invoice.findFirst({ where: { id: invoiceId, userId } });

            if(!invoice) {
                res.status(200).json({ success: false, message: 'Invoice not found' });
                return;
            }

            // Update the invoice
            const updatedInvoice: Invoice | null = await prisma.invoice.update({
                where: { id: invoiceId },
                data: {
                    invoiceNumber,
                    type,
                    partyId,
                    phone,
                    partyName,
                    totalAmount,
                    totalGst,
                    stateOfSupply,
                    cgst,
                    sgst,
                    igst,
                    utgst,
                    details,
                    extraDetails,
                    items: {
                        upsert: items.map((item: InvoiceItem) => ({
                            where: { id: item.id },
                            create: item,
                            update: item,
                        })),
                    },
                },
            });

            res.status(200).json({ sucess: true, updatedInvoice });
        } catch (error) {
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const invoiceId = req.params.id;

            const { id: userId } = req.user!;

            const invoice = await prisma.invoice.findFirst({ where: { id: invoiceId, userId } });

            if(!invoice) {
                return res.status(200).json({ success: false, message: 'Invoice not found' });
            }

            await prisma.invoiceItem.deleteMany({ where: { invoiceId } });

            // Delete the invoice
            const deletedInvoice: Invoice | null = await prisma.invoice.delete({ where: { id: invoiceId } });

            return res.status(200).json({ success: true, deletedInvoice });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async createParty(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            // Create the party
            const { partyName, type, gstin, pan, tan, upi, email, phone, address, bankName, bankAccountNumber, bankIfsc, bankBranch } = req.body;

            const party: Party = await prisma.party.create({
                data: {
                    partyName,
                    type,
                    gstin,
                    pan,
                    tan,
                    upi,
                    userId,
                    email,
                    phone,
                    address,
                    bankName,
                    bankAccountNumber,
                    bankIfsc,
                    bankBranch,
                },
            });

            return res.status(201).json({ success: true, party });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async deleteParty(req: Request, res: Response) {
        try {
            const partyId = req.params.id;

            const { id: userId } = req.user!;

            const party = await prisma.party.findFirst({ where: { id: partyId, userId } });

            if(!party) {
                return res.status(200).json({ success: false, message: 'Party not found' });
            }

            // Delete the party
            const deletedParty: Party | null = await prisma.party.delete({ where: { id: partyId } });

            return res.status(200).json({ success: true, deletedParty });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async createItem(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            // Create the item
            const { itemName, unit, price, openingStock, closingStock, purchasePrice, cgst, sgst, igst, utgst, taxExempted, description, hsnCode, categoryId, supplierId } = req.body;

            const item: Item = await prisma.item.create({
                data: {
                    itemName,
                    unit,
                    price,
                    openingStock,
                    closingStock,
                    purchasePrice,
                    cgst,
                    sgst,
                    igst,
                    utgst,
                    userId,
                    taxExempted,
                    description,
                    hsnCode,
                    categoryId,
                    supplierId,
                },
            });

            return res.status(201).json({ success: true, item });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async deleteItem(req: Request, res: Response) {
        try {
            const itemId = req.params.id;

            const { id: userId } = req.user!;

            const item = await prisma.item.findFirst({ where: { id: itemId, userId } });

            if(!item) {
                return res.status(404).json({ success: false, message: 'Item does not exists.' });
            }

            // Delete the invoice
            const deletedItem: Item | null = await prisma.item.delete({ where: { id: itemId } });

            return res.status(200).json({ success: true, deletedItem });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getAllParties(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            // Pagination parameters
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = parseInt(page.toString(), 10);
            const parsedLimit = parseInt(limit.toString(), 10);

            // Calculate the offset based on the page and limit
            const offset = (parsedPage - 1) * parsedLimit;

            // Get all parties of the user with pagination
            const parties: Party[] = await prisma.party.findMany({
                where: { userId },
                skip: offset,
                take: parsedLimit,
            });

            return res.status(200).json({ success: true, parties });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getPartyById(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            const partyId = req.params.id;

            // Get the party by ID
            const party: Party | null = await prisma.party.findFirst({ where: { id: partyId, userId } });

            if (!party) {
                return res.status(404).json({ success: false, message: 'Party not found' });
            }

            return res.status(200).json({ success: true, party });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getAllItems(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            // Pagination parameters
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = parseInt(page.toString(), 10);
            const parsedLimit = parseInt(limit.toString(), 10);

            // Calculate the offset based on the page and limit
            const offset = (parsedPage - 1) * parsedLimit;

            // Get all parties of the user with pagination
            const items: Item[] = await prisma.item.findMany({
                where: { userId },
                skip: offset,
                take: parsedLimit,
            });

            return res.status(200).json({ success: true, items });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getItemById(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            const itemId = req.params.id;

            // Get the party by ID
            const item: Item | null = await prisma.item.findFirst({ where: { id: itemId, userId } });

            if (!item) {
                return res.status(404).json({ success: false, message: 'Item not found' });
            }

            return res.status(200).json({ success: true, item });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

}

export default InvoiceController;
