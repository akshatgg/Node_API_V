import { Request, Response } from "express";
import { prisma } from "..";
import { Gstr1_4A, Prisma } from "@prisma/client";


function findUniqueGSTRecords(records: Gstr1_4A[]) {
    const uniqueRecordsMap = new Map<string, Gstr1_4A>();
    records.forEach(record => {
        if (!uniqueRecordsMap.has(record.GSTN)) {
            uniqueRecordsMap.set(record.GSTN, record);
        }
    });
    const uniqueRecords = Array.from(uniqueRecordsMap.values());
    const uniqueGSTNs = Array.from(uniqueRecordsMap.keys());

    return { uniqueRecords, uniqueGSTNs };
}

export default class GSTR1Controller {
    // GSTR1 - 4A
    static async create (req:Request,res:Response){

        try {
              const user = req.user!; 
              
              const {LegalName,GSTN,pos,invoice_No,invoice_date,
              invoice_value,rate,nature,source,cgst,igst,
              sgst,supply_type,fy,period,trade_Name,taxpayer_type,processed_records,status} =req.body
      
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
                  trade_Name,
                  taxpayer_type,
                  processed_records,
                  status
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

    static async getallview4A ( req: Request,res: Response){
        try {
            const allRecords = await prisma.gstr1_4A.findMany(); // Assuming gstr1_4A is your Prisma model
    
            const { uniqueRecords, uniqueGSTNs  } = findUniqueGSTRecords(allRecords);
            
            if (uniqueRecords.length === 0) {
                return res.status(404).json({ success: false, message: "No records found" });
            }

            const getgstcount = await Promise.all(uniqueGSTNs.map(item => {
                return prisma.gstr1_4A.count({
                    where: {
                        GSTN: item
                    }
                });
            }));
            
            if (getgstcount.length === 0) {
                return res.status(404).json({ success: false, message: "No records found" });
            }

            
            res.status(200).json({ success: true, message: "Records with unique GSTN fetched successfully", data: uniqueRecords,getgstcount });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getbygstin4A ( req: Request, res: Response){
        try {
            const GSTN=req.params.id;
            
            if(!GSTN){
                return res.status(404)
                .json({success:false,message:"GSTN Prarams required for this operation"})
            }

            const single= await prisma.gstr1_4A.findFirst({where:{GSTN:GSTN}})

            if(!single){
                return res.status(404)
                .json({success:false,message:"record Not Found"});
            }

            return res.status(200).json({success:true,message:"record Found",data:single});
            
        } catch (error) {
            return res.status(500).json({success:false,message:"internal server error"})    
        }
    }

    static async update (req: Request, res: Response){
        try {

     const {LegalName,GSTN,pos,invoice_No,invoice_date,
     invoice_value,rate,nature,source,cgst,igst,
     sgst,supply_type,fy,period, taxpayer_type,trade_Name,
     processed_records,status} =req.body


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
            trade_Name,
            taxpayer_type,
            processed_records,
            status
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

            await prisma.gstr1_4A.delete({where:{id:+id}})

            return res.status(200).json({success:true,message:"record deleted "})
            
        } catch (error) {
            return res.status(500).json({success:false,message:" internal server error: "})
        }
    }

    // GSTR1 - 5A 

    static async create5A (req:Request, res:Response){
       try {
        const  user = req.user!; 

        const {pos,invoice_No,supply_type,invoice_date,total_taxable_value,integrated_tax,
            cess,invoice_value,total_invoice_value,gstr1_5A_items} =req.body

            const formattedGSTR15AItems = gstr1_5A_items
                ? gstr1_5A_items.map(({ tax_rate, Ammmout_of_tax, Igst,cess }: { tax_rate: string; Ammmout_of_tax: string; Igst: string ,cess:string}) => ({
                    tax_rate,
                    Ammmout_of_tax,
                    Igst,
                    cess
                }))
                : [];
                const totalItems = await prisma.gstr1_5A.count();
                const nextSrNo = totalItems + 1;

            const GSTR1_5A_DATA : Prisma.Gstr1_5ACreateInput  =    {
                sr_no:nextSrNo,
                pos,
                invoice_No,
                supply_type,
                invoice_date,
                invoice_value,
                total_taxable_value,
                integrated_tax,
                cess,
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
     
            const {pos,invoice_No,supply_type,invoice_date,total_taxable_value,integrated_tax,
                cess,invoice_value,total_invoice_value,gstr1_5A_items} =req.body
             const  user = req.user!; 

             const id =req.params.id;
    
             if (!id) {
                return res.
                status(400).
                json({ success: true,
                     message: 'Post ID is required for this operation' });
               }
 
               const formattedGSTR15AItems = gstr1_5A_items
               ? gstr1_5A_items.map(({ tax_rate, Ammmout_of_tax, Igst,cess }: { tax_rate: string; Ammmout_of_tax: string; Igst: string ,cess:string}) => ({
                   tax_rate,
                   Ammmout_of_tax,
                   Igst,
                   cess
               }))
               : [];

 
             const GSTR1_5A_DATA : Prisma.Gstr1_5AUpdateInput  =    {
                pos,
                invoice_No,
                supply_type,
                invoice_date,
                total_taxable_value,
                integrated_tax,
                cess,
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

             if(!GSTR1_5A){
                return res.status(500).json({success:false,message:"user not created This Record"})
             }
 
             return res.status(201)
             .json({success:true,message:"successfully Updated Record",data:GSTR1_5A});
        } catch (error) {
         return res.status(500).json({success:false,message:"internal server error"})
        }
     }

    static async getall5A (req: Request, res: Response){
        try {
            const user = req.user!; 

            const allgstr1 = await prisma.gstr1_5A.findMany({
                where:{userId:user.id}
            })

            if(allgstr1.length === 0){
               return res.status(404)
                .json({success:false,message:"no Records found"})
            }

          return  res.status(200)
            .json({success:true,
            message:"reccords fetch successfully",
            data:allgstr1})

        } catch (error) {
            return res.status(500)
            .json({ success: false, 
            message: 'Internal server error' });
        }
    } 

    static async delete5A (req: Request, res: Response){
        try {
            const id=req.params.id;
            const user = req.user!;

            if(!id){
                return res.status(404)
                .json({success:false,message:"id Prarams required for this operation"})
            }

            const single= await prisma.gstr1_5A.findFirst({where:{id:+id,userId:user.id}})

            if(!single){
                return res.status(404)
                .json({success:false,message:"record Not Found"});
            }

            await prisma.gstr1_5A.delete({where:{id:+id}})

            const remainingItems = await prisma.gstr1_5A.findMany();
            for (let i = 0; i < remainingItems.length; i++) {
              await prisma.gstr1_5A.update({
                where: {
                  id: remainingItems[i].id
                },
                data: {
                  sr_no: i + 1
                }
              });
            }

            return res.status(200).json({success:true,message:"record deleted "})
            
        } catch (error) {
            return res.status(500).json({success:false,message:" internal server error: "})
        }
    }

  


}