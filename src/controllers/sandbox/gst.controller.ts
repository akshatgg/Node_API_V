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

            const { status, data: { data } } = await axios.get(endpoint, {
                headers,
                params: {
                    gstin
                }
            });

            if(status !== 200) {
                return res.status(500).send({ success: false, message: "Something went wrong" });
            }

            return res.status(200).send({ success: true, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async searchGSTINNumberByPan(req: Request, res: Response) {
        try {
            const { pan, gst_state_code } = req.query;

            if(!pan || !gst_state_code) {
                return res.status(400).json({ success: false, message: "Required query params missing" });
            }

            const endpoint = `${Sandbox.BASE_URL}/gsp/public/pan/${pan}?state_code=${gst_state_code}`;

            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { status, data: { data } } = await axios.get(endpoint, {
                headers,
            });

            if(status !== 200) {
                return res.status(500).send({ success: false, message: "Something went wrong" });
            }

            return res.status(200).send({ success: true, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async trackGSTReturn(req: Request, res: Response) {
        try {
            const { gstin, financialYear } = req.body;

            if(!validateGSTIN(gstin)) {
                return res.status(400).json({ success: false, message: "Please enter valid GSTIN" });
            }

            if(!financialYear) {
                return res.status(400).json({ success: false, message: "Please enter valid Financial Year" });
            }

            const endpoint = `${Sandbox.BASE_URL}/gsp/public/gstr?gstin=${gstin}&financial_year=${financialYear}`;

            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { status, data: { data } } = await axios.get(endpoint, {
                headers,
                params: {
                    gstin
                }
            });

            if(status !== 200) {
                return res.status(500).send({ success: false, message: "Something went wrong" });
            }

            return res.status(200).send({ success: true, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async proceedToFileGstr(req: Request, res: Response) {
        try {
            const { gstin, returnPeriod, year, month, returnType, isNil } = req.body;

            if(!validateGSTIN(gstin)) {
                return res.status(400).json({ success: false, message: "Please enter valid GSTIN" });
            }

            if(!returnPeriod || !year || !month || !returnType || !isNil) {
                return res.status(400).json({ success: false, message: "Required Body Params missing" });
            }

            const endpoint = `${Sandbox.BASE_URL}/gsp/tax-payer/${gstin}/${returnType}/${year}/${month}/proceed?is_nil=${isNil}`;

            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { status, data: { data } } = await axios.post(endpoint, {
                gstin,
                ret_period: returnPeriod
            }, {
                headers,
            });

            if(status !== 200) {
                return res.status(500).send({ success: false, message: "Something went wrong" });
            }

            return res.status(200).send({ success: true, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async registerForGST(req: Request, res: Response) {
        try {
            const { gstin, payload } = req.body;

            if(!validateGSTIN(gstin)) {
                return res.status(400).json({ success: false, message: "Please enter valid GSTIN" });
            }

            const endpoint = `${Sandbox.BASE_URL}/gsp/tax-payer/${gstin}/registration`;

            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { status, data: { data } } = await axios.post(endpoint, payload, {
                headers,
            });

            if(status !== 200) {
                return res.status(500).send({ success: false, message: "Something went wrong" });
            }

            return res.status(200).send({ success: true, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async generateOTP(req: Request, res: Response) {
        try {
            const { gstin, username } = req.body;

            if(!validateGSTIN(gstin)) {
                return res.status(400).json({ success: false, message: "Please enter valid GSTIN" });
            }

            const endpoint = `${Sandbox.BASE_URL}/gsp/tax-payer/${gstin}/otp?username=${username}`;
            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const { status, data: { data } } = await axios.post(endpoint, {}, {
                headers,
            });

            if(status === 401) {
                return res.status(401).send({ success: false, message: 'Unauthorized Access' });
            }

            return res.status(200).send({ success: true, data });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async verifyOTP(req: Request, res: Response) {
        try {
            const { gstin, username, otp } = req.body;

            if(!validateGSTIN(gstin)) {
                return res.status(400).json({ success: false, message: "Please enter valid GSTIN" });
            }

            const endpoint = `${Sandbox.BASE_URL}/gsp/tax-payer/${gstin}/otp/verify?username=${username}&otp=${otp}`;
            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const response = await axios.post(endpoint, {}, {
                headers,
            });

            if(response.status !== 200) {
                return res.status(500).send({ success: true, message: "Could not authenticate. Something went wrong" });
            }

            return res.status(200).send({ success: true, message: `GSTIN: ${gstin} authenticated successfully!` });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

}