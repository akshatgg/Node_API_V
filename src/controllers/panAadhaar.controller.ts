import { Request, Response } from "express";
import Sandbox from "../services/sandbox.service";
import axios from "axios";

export default class PanAadhaarController {

    static async checkLinkStatus(req: Request, res: Response) {
        try {
            const { pan, aadhaar } = req.body;

            if (!pan) {
                return res.status(400).json({ success: false, message: 'Enter a valid PAN Number' });
            }

            if (!aadhaar) {
                return res.status(400).json({ success: false, message: 'Enter a valid Aadhaar Number' });
            }

            const endpoint = `${Sandbox.BASE_URL}/it-tools/pans/${pan}/pan-aadhaar-status?aadhaar_number=${aadhaar}`;

            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { data } = await axios.post(endpoint, {}, { headers });

            return res.status(200).send({ success: true, data });

        } catch (e) {
            console.log(e);
        }
    }

}