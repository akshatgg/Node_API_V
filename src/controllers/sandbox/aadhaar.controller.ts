import e, { Request, Response } from "express";
import Sandbox from "../../services/sandbox.service";
import axios from "axios";

export default class AadhaarController {
    static async aadharGenerateOtp(req: Request, res: Response) {
        try {
          const { aadhaar } = req.body;
    
          // Validate the `aadhaar_number` field
          if (!aadhaar) {
            return res
              .status(400)
              .json({ success: false, message: "Body parameter 'aadhaar_number' is required" });
          }
    
          // Endpoint for generating OTP
          const endpoint = `${Sandbox.BASE_URL}/kyc/aadhaar/okyc/otp`;
    
          // Generate access token
          const token = await Sandbox.generateAccessToken();
    
          // Headers for the request
          const headers = {
            Authorization: token,
            Accept: "application/json",
            "x-api-key": process.env.SANDBOX_KEY,
            "x-api-version": process.env.SANDBOX_API_VERSION,
          };
    
          // Prepare the request body
          const body = {
            aadhaar_number:aadhaar,
            "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.request",
            consent: "Y",
            reason: "For KYC of User",
          };
    
          // Make the POST request to generate OTP
          const { status, data } = await axios.post(endpoint, body, { headers });
    
          // Handle non-200 status responses
          if (status !== 200) {
            return res.status(500).send({ success: false, message: "Something went wrong" });
          }
    
          // Return success response
          return res.status(200).json({ success: true, data });
        } catch (e) {
          console.error("Error generating Aadhaar OTP:", e);
          return res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
        }
      }
    
    static async aadhaarVerifyOtp(req: Request, res: Response) {
        try {
            const {otp ,reference_id} = req.body;
            if(!otp) {
                return res.status(400).json({ success: false, message: 'Body parameter otp was not provided' });
            }
            if(!reference_id) {
                return res.status(400).json({ success: false, message: 'Body parameter ref_id was not provided' });
            }

            const endpoint = `${Sandbox.BASE_URL}/kyc/aadhaar/okyc/otp/verify`;
            const token = await Sandbox.generateAccessToken();

            const headers = {
                'Authorization': token,
                'accept': 'application/json',
                'x-api-key': process.env.SANDBOX_KEY,
                'x-api-version': process.env.SANDBOX_API_VERSION
            };

            const response = await axios.post(endpoint, 
              {
                otp,
                reference_id,
                "@entity": "in.co.sandbox.kyc.aadhaar.okyc.request"
              }, {
                headers,
            });

            if(response.status !== 200) {
                return res.status(500).json({ success: false, message: "Could not verify. Something went wrong" });
            }

            return res.status(200).send({ success: true, message: `OTP: ${otp} verify successfully!` });
        } catch(e) {
            console.log(e);
            // return res.status(500).json({ success: false, message: 'Something went wrong ' });
        }
    }
   
    static async verifyAadhaar(req: Request, res: Response) {
        try {
          const { aadhaar_number, otp, reference_id } = req.body;
    
          // Validate required fields
          if (!aadhaar_number || !otp || !reference_id) {
            return res.status(400).json({
              success: false,
              message: "Missing required fields: 'aadhaar_number', 'otp', or 'reference_id'",
            });
          }
    
          // Endpoint for verifying Aadhaar OTP
          const endpoint = `${Sandbox.BASE_URL}/kyc/aadhaar/okyc/otp/verify`;
    
          // Generate access token
          const token = await Sandbox.generateAccessToken();
    
          // Request headers
          const headers = {
            Authorization: token,
            Accept: "application/json",
            "x-api-key": process.env.SANDBOX_KEY,
            "x-api-version": process.env.SANDBOX_API_VERSION,
          };
    
          // Request body
          const body = {
            aadhaar_number,
            otp,
            reference_id,
            "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.verify",
          };
    
          // Make POST request to verify Aadhaar OTP
          const { status, data } = await axios.post(endpoint, body, { headers });
    
          // Handle non-200 status responses
          if (status !== 200) {
            return res.status(500).json({
              success: false,
              message: "Failed to verify Aadhaar OTP",
            });
          }
    
          // Return success response
          return res.status(200).json({ success: true, data });
        } catch (e) {
          console.error("Error verifying Aadhaar OTP:", e);
          return res
            .status(500)
            .json({ success: false, message: "Something went wrong"});
        }
      }
}