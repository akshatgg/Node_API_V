import { Request, Response } from "express";

import PincodeDirectory from 'india-pincode-lookup';

export default class PincodeController {

    static async getPincodeByCity(req: Request, res: Response) {
        try {
            const { city } = req.body;

            if(!city) {
                return res.status(400).send({ success: false, message: 'Required field "city" is missing' });
            }

            const data = await PincodeDirectory.lookup(city);

            return res.status(200).send({ success: false, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

    static async getInfoByPincode(req: Request, res: Response) {
        try {
            const { pincode } = req.body;

            if(!pincode) {
                return res.status(400).send({ success: false, message: 'Required field "pincode" is missing' });
            }

            const data = await PincodeDirectory.lookup(pincode);

            return res.status(200).send({ success: false, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    }

}