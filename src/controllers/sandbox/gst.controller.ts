import { Request, Response } from "express";
import { validateGSTIN } from "../../lib/util";
import Sandbox from "../../services/sandbox.service";
import axios from "axios";

export default class GSTController {

    static async searchByGSTIN(req: Request, res: Response) {
        try {
            const { gstin } = req.body;

            if(!validateGSTIN(gstin)) {
                return res.status(400).json({ success: false, message: "Please enter valid GSTIN" });
            }

            const endpoint = `${Sandbox.BASE_URL}/gsp/public/gstin/`;

            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { data: { data } } = await axios.get(endpoint, {
                headers,
                params: {
                    gstin
                }
            });

            return res.status(200).send({ success: true, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

}