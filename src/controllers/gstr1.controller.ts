import { Request, Response } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";

export default class GSTR1Controller {

    // GSTR1 - 4A

    static async create (req:Request,res:Response){

        try {
              const user = req.user!; 
              
              const {LegalName,GSTN,pos,invoice_No,invoice_date,
              invoice_value,rate,nature,source,cgst,igst,
              sgst,supply_type,fy,period} =req.body
      
              if(!LegalName || !GSTN || !invoice_No || !pos  ){
                return  res.status(400).json({success:false,message:"Please fill Required Feilds"})
              }
      
              const gstr1  = await prisma.gstr1_4A.create({
                  data:{
                  userId: user.id,
                  LegalName,
                  GSTN,
                  pos,
                  invoice_No,
                  invoice_date,
                  invoice_value,
                  rate,nature,
                  source,
                  cgst,
                  igst,
                  sgst,
                  supply_type,
                  fy,
                  period,
                  }
              })
      
              res.status(201).
              json({success:true,          
              message:"successfully created Record",
              data:gstr1})
    
        
        } catch (error) {
            return res.status(500)
            .json({ success: false, 
            message: 'Internal server error' });
        }

    }

    static async getsingle (req: Request,res: Response){
        try {
            const id=req.params.id;
            const user = req.user!;

            if(!id){
                return res.status(404)
                .json({success:false,message:"id Prarams required for this operation"})
            }

            const single= await prisma.gstr1_4A.findFirst({where:{id:+id,userId:user.id}})

            if(!single){
                return res.status(404)
                .json({success:false,message:"record Not Found"});
            }

            return res.status(200).json({success:true,message:"record Found",data:single});
            
        } catch (error) {
            return res.status(500).json({success:false,message:"internal server error"})    
        }
    }

    static async getll ( req: Request,res: Response){
        try {
            const user = req.user!; 

            const allgstr1 = await prisma.gstr1_4A.findMany({
                where:{userId:user.id}
            })

            if(allgstr1.length === 0){
                res.status(404)
                .json({success:false,message:"no Records found"})
            }

            res.status(200)
            .json({success:true,
            message:"reccords fetch successfully",
            data:allgstr1})

        } catch (error) {
            return res.status(500)
            .json({ success: false, 
            message: 'Internal server error' });
        }
    }

    static async update (req: Request, res: Response){
        try {

     const {LegalName,GSTN,pos,invoice_No,invoice_date,
     invoice_value,rate,nature,source,cgst,igst,
     sgst,supply_type,fy,period} =req.body


           const id= req.params.id;

           const user = req.user!;

           if (!id) {
            return res.
            status(400).
            json({ success: true,
                 message: 'Post ID is required for this operation' });
           }

          if(!LegalName || !GSTN || !invoice_No || !pos  ){
          return  res.status(400).json({success:false,message:"Please fill Required Feilds"})
        }
        const gstr1  = await prisma.gstr1_4A.update({
            where:{id:+id},
            data:{
            userId: user.id,
            LegalName,
            GSTN,
            pos,
            invoice_No,
            invoice_date,
            invoice_value,
            rate,nature,
            source,
            cgst,
            igst,
            sgst,
            supply_type,
            fy,
            period,
            }
        })

        res.status(201).
        json({success:true,          
        message:"successfully updated Record",
        data:gstr1})
        
        } catch (error) {
            return res.status(500)
            .json({ success: false, 
            message: 'Internal server error' });
        }
    }

    static async delete (req: Request, res: Response){
        try {
            const id=req.params.id;
            const user = req.user!;

            if(!id){
                return res.status(404)
                .json({success:false,message:"id Prarams required for this operation"})
            }

            const single= await prisma.gstr1_4A.findFirst({where:{id:+id,userId:user.id}})

            if(!single){
                return res.status(404)
                .json({success:false,message:"record Not Found"});
            }

            const deleteRecord =await prisma.gstr1_4A.delete({where:{id:+id}})

            return res.status(200).json({success:true,message:"record deleted "})
            
        } catch (error) {
            return res.status(500).json({success:false,message:" internal server error: "})
        }
    }


    // GSTR1 - 5A 

    static async create5A (req:Request, res:Response){
       try {
        const  user = req.user!; 

        const {pos,invoice_No,supply_type,invoice_date,invoice_value,
            total_invoice_value,gstr1_5A_items} =req.body

            const formattedGSTR15AItems = gstr1_5A_items
                ? gstr1_5A_items.map(({ SN, turnover, cgst,sgst }: { SN: string; turnover: string; cgst: string ,sgst:string}) => ({
                    SN,
                    turnover,
                    cgst,
                    sgst
                }))
                : [];

            const GSTR1_5A_DATA : Prisma.Gstr1_5ACreateInput  =    {
                pos,
                invoice_No,
                supply_type,
                invoice_date,
                invoice_value,
                total_invoice_value,
                gstr1_5A_items:{
                    create :formattedGSTR15AItems
                },
                user: {
                    connect: { id: user.id },
                },
            }  

            const GSTR1_5A = await prisma.gstr1_5A.create({
                data:GSTR1_5A_DATA,
                include:{
                    gstr1_5A_items:true
                }
            })

            return res.status(201)
            .json({success:true,message:"successfully Created Record",data:GSTR1_5A});
       } catch (error) {
        return res.status(500).json({success:false,message:"internal server error"})
       }
    }

    static async update5A (req:Request, res:Response){
        try {
     
         const {pos,invoice_No,supply_type,invoice_date,invoice_value,
             total_invoice_value,gstr1_5A_items} =req.body

             const  user = req.user!; 

             const id =req.params.id;
    
             if (!id) {
                return res.
                status(400).
                json({ success: true,
                     message: 'Post ID is required for this operation' });
               }
 
             const formattedGSTR15AItems = gstr1_5A_items
                 ? gstr1_5A_items.map(({ SN, turnover, cgst,sgst }: { SN: string; turnover: string; cgst: string ,sgst:string}) => ({
                     SN,
                     turnover,
                     cgst,
                     sgst
                 }))
                 : [];
 
             const GSTR1_5A_DATA : Prisma.Gstr1_5AUpdateInput  =    {
                 pos,
                 invoice_No,
                 supply_type,
                 invoice_date,
                 invoice_value,
                 total_invoice_value,
                 gstr1_5A_items:{
                     create :formattedGSTR15AItems
                 },
                 user: {
                     connect: { id: user.id },
                 },
             }  
 
             const GSTR1_5A = await prisma.gstr1_5A.update({
                where:{id:+id},
                 data:GSTR1_5A_DATA,
                 include:{
                     gstr1_5A_items:true
                 }
             })
 
             return res.status(201)
             .json({success:true,message:"successfully Updated Record",data:GSTR1_5A});
        } catch (error) {
         return res.status(500).json({success:false,message:"internal server error"})
        }
     }










}