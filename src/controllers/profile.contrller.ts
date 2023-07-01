import { Request, Response } from 'express';
import { Profile, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// create profile

class ProfileController {
  static async createProfile(req: Request, res: Response): Promise<void> {
    try {
      const {
       
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

  // find All profile
  static async findAllProfile(req: Request, res: Response): Promise<void>{
    try{
        const  allprofile = await prisma.profile.findMany({})
        res.status(200).json({ success: true, allprofile });

    }catch(error){
      res.status(500).json({ success: false, message: 'Internal server error', errors:error });

    }
  }

  //get profile by id
  
  static async findOneProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
  
      const profile: Profile | null = await prisma.profile.findUnique({
        where: {
          Id: id,
        },
      });
  
      if (!profile) {
        res.status(404).json({ success: false, message: 'Profile not found' });
        return;
      }
  
      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
//profile update by id
  static async updateProfile(req: Request, res: Response): Promise<void>{
    try{
      const profileId = parseInt(req.params.id);
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
      const updatedProfile: Profile | null = await prisma.profile.update({
        where: { Id: profileId },
        data:{
          name,
          email,
          phoneNumber,
          businessName,
          contactAddress,
          gstin,
          paymentDetails,
          notes,
          logo,
        }
      })
      if (!updatedProfile) {
        res.status(404).json({ sucess: false, message: 'profile not found' });
        return;
    }

    res.status(200).json({ sucess: true, updatedProfile });
      
    }catch(error){
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }

  }

  //delete profile by id
  static async deleteProfile(req: Request, res: Response): Promise<void>{
    try{
      const profileId = parseInt(req.params.id);

      // Delete the profile
      const deletedProfile: Profile | null = await prisma.profile.delete({ where: { Id: profileId } });

      if (!deletedProfile) {
          res.status(404).json({ success: false, message: 'Profile not found' });
          return;
      }

      res.status(200).json({ success: true, deletedProfile });
    }catch(error){
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  

}

   

export default ProfileController;
