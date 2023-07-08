import { Request, Response } from "express";
import Sandbox from "../../services/sandbox.service";
import axios from "axios";

export default class PanController {

    static async getAdvancePanDetails(req: Request, res: Response) {
        try {
            const { pan } = req.query;

            if (!pan) {
                return res.status(400).json({ success: false, message: 'Enter a valid PAN Number' });
            }

            const endpoint = `${Sandbox.BASE_URL}/kyc/pan`;

            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { data: { data } } = await axios.post(endpoint, {
                pan,
                consent: 'Y',
                reason: 'For KYC of User',
            }, {
                headers,
            });

            return res.status(200).send({ success: true, data });
        } catch (e) {
            console.log(e);
        }
    }

}