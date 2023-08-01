import { Request, Response } from 'express';
import { prisma } from '../index';
import { BusinessSetting } from '@prisma/client'

class BusinessSettingController {
    static async createBusiness(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = req.user!;
            const {
                phone, email, gstNo, panNo, street, state,
                pin, city, accountNo, ifscCode, bank_branchName, acc_holderName,
                industryType, businessType
            } = req.body

            const existingUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                res.status(404).json({ error: 'User not found' });
                return
            }
            const newBusinessSetting: BusinessSetting = await prisma.businessSetting.create({
                data: {
                    phone, email, gstNo, panNo, street, state,
                    pin, city, accountNo, ifscCode, bank_branchName, acc_holderName,
                    industryType, businessType, userId,
                }
            })
            res.status(201).json({ result: newBusinessSetting, message: 'Sucessfull Business Setting created' });
        } catch (error) {

            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    // find All business Setting
    static async findAllSetting(req: Request, res: Response): Promise<void> {
        try {
            const allBusinessSetting = await prisma.businessSetting.findMany({});

            res.status(200).json({ success: true, allBusinessSetting });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', errors: error });
        }
    }

    //get business setting by id
    static async getById(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;

            // Get the invoice by ID
            const Business: BusinessSetting | null = await prisma.businessSetting.findUnique({
                where: { id: parseInt(id) },

            });

            if (!Business) {
                res.status(404).json({ sucess: false, message: 'Business Setting not found' });
                return;
            }

            res.status(200).json(Business);
        } catch (error) {
            res.status(500).json({ sucess: false, message: 'Internal server error' });
        }
    }


    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const {
                phone, email, gstNo, panNo, street, state,
                pin, city, accountNo, ifscCode, bank_branchName, acc_holderName,
                industryType, businessType
            } = req.body
            const updatedBusinessSetting = await prisma.businessSetting.update({
                where: { id: parseInt(id) },

                data: {
                    phone, email, gstNo, panNo, street, state,
                    pin, city, accountNo, ifscCode, bank_branchName, acc_holderName,
                    industryType, businessType,
                },
            });
            res.status(200).json({ success: true, updatedBusinessSetting });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    //delete ledger
    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedBusinessSetting = await prisma.businessSetting.delete({
                where: { id: parseInt(id) },

            });
            res.status(200).json({ success: true, deletedBusinessSetting, message: "Businesss Setting delete sucessfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }




    }

}
export default BusinessSettingController