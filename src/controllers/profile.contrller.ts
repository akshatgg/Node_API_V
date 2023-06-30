import { Request, Response } from 'express';
import { Profile, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProfileController {
  static async createProfile(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        name,
        email,
        phoneNumber,
        businessName,
        contactAddress,
        gstin,
        paymentDetails,
        notes,
        logo,
      } = req.body;

      const  Profile = await prisma.profile.create({
        data: {
          userId,
          name,
          email,
          phoneNumber,
          businessName,
          contactAddress,
          gstin,
          paymentDetails,
          notes,
          logo,
        },
      });
       
      res.status(201).json({ message: 'Profile added successfully' ,result:Profile });
    } catch (error) {
        //console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error', errors:error });
    }
  }

  static async findAllProfile(req: Request, res: Response): Promise<void>{
    try{
        const  allprofile = await prisma.profile.findMany({})
        res.status(200).json({ success: true, allprofile });

    }catch(error){
      res.status(500).json({ success: false, message: 'Internal server error', errors:error });

    }
  }
}
   

export default ProfileController;
