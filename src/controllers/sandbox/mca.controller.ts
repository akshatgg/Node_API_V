import { Request, Response } from "express";
import Sandbox from "../../services/sandbox.service";
import axios from "axios";

export default class MCAController {

    static async getCompanyByCIN(req: Request, res: Response) {
        try {
            const { cin } = req.query;
            const { id } = req.body; // Extracting `entity` and `id` from the body
    
            const consent = "user-consent"; // Hardcoded value for consent
            const reason = "data-verification"; // Hardcoded value for reason
    
            if (!cin) {
                return res.status(400).json({ success: false, message: 'Query parameter CIN was not provided' });
            }
    
            if (!id) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Required body parameters (entity, id) are missing' 
                });
            }
    
            const endpoint = `${Sandbox.BASE_URL}/mca/company/master-data/search`;
    
            const token = await Sandbox.generateAccessToken();
    
            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };
    
            // Preparing the request body to include consent and reason along with data
            const requestBody = {
                "@entity": "in.co.sandbox.kyc.mca.master_data.request",
                id,
                consent,
                reason
            };
    
            const { status, data: { data } } = await axios.post(endpoint, requestBody, { headers });
    
            if (status !== 200) {
                return res.status(500).send({ success: false, message: "Something went wrong" });
            }
    
            return res.status(200).json({
                success: true,
                data
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async getDirectorByDIN(req: Request, res: Response) {
        try {
            const { din } = req.query;
            const { entity, id } = req.body; // Extracting `entity` and `id` from the body
    
            const consent = "user-consent"; // Hardcoded value for consent
            const reason = "data-verification"; // Hardcoded value for reason
    
            if (!din) {
                return res.status(400).json({ success: false, message: 'Query parameter DIN was not provided' });
            }
    
            if (!entity || !id) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Required body parameters (entity, id) are missing' 
                });
            }
    
            const endpoint = `${Sandbox.BASE_URL}/mca/director/master-data/search`;
    
            const token = await Sandbox.generateAccessToken();
    
            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };
    
            // Preparing the request body to include consent and reason along with data
            const requestBody = {
                entity,
                id,
                consent,
                reason
            };
    
            const { status, data: { data } } = await axios.post(endpoint, requestBody, { headers });
    
            if (status !== 200) {
                return res.status(500).send({ success: false, message: "Something went wrong" });
            }
            return res.status(200).json({
                success: true,
                data
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }
}