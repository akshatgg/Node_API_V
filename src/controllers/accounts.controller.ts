import { Request, Response } from "express";
import { prisma } from "..";

export class Accountscontroller {


    static async Payablebill(req: Request, res: Response) {
    try {
    
    const { supplierName, supplierAddress, contact, billDate ,
      dueDate , billAmount ,billNumber ,billDiscription,   paymentMethod ,transactionId , paymentDate ,
      paymentAmount ,tax ,comment,
      invoiceNumber } =req.body;
    
      if (!supplierName || !supplierAddress || !contact || !invoiceNumber || !billNumber || !paymentAmount ) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
      }
    
      const billpayable = await prisma.billpayable.create({
        data: {
            supplierName,
            supplierAddress,
             contact,
             billDate,
             dueDate ,
             billAmount ,
             billNumber  ,
            billDiscription,
             paymentMethod ,
            transactionId , 
            paymentDate ,
            paymentAmount ,
             tax ,
            comment ,       
            invoiceNumber  
        },
    });
    
    return res.status(200).json({ success: true, data: billpayable });
    
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: 'Error In creating BillPayable',
     });
    }

    }

    static async getonepayablebill (req: Request, res: Response){
        try {
            const { id } = req.params;

            const onebill = await prisma.billpayable.findFirst({where: {id: +id}})

            if(!onebill){
                return res.status(404).send({ success: false, message: 'Bill Post Not Found' });
            }
            if (!id) {
                return res.status(400).json({ success: true, message: ' ID is required for this operation' });
            }
    

            return res.status(200).json({ success: true, data: onebill });
            
        } catch (error:any) {
            return res.status(500).json({
                success: false,
                message: 'Error In creating BillPayable',
             });   
        }
    }

    static async getallpayablebill (req: Request, res: Response){
        try {

            const allbill = await prisma.billpayable.findMany({})

            if(!allbill){
                return res.status(404).send({ success: false, message: 'Bill Post Not Found' });
            }

            return res.status(200).json({ success: true, data: allbill });
            
        } catch (error:any) {
            return res.status(500).json({
                success: false,
                message: 'Error In creating BillPayable',
             });   
        }
    }

    static async updatepayablebill (req: Request, res: Response){
        try {

            const { id } = req.params;

            const { supplierName, supplierAddress, contact, billDate ,
                dueDate , billAmount ,billNumber ,billDiscription,   paymentMethod ,transactionId , paymentDate ,
                paymentAmount ,tax ,comment,
                invoiceNumber } =req.body;
              
                if (!supplierName || !supplierAddress || !contact || !invoiceNumber || !billNumber || !paymentAmount ) {
                  return res.status(400).json({ success: false, message: 'Missing required fields.' });
                }

                if (!id) {
                    return res.status(400).json({ success: true, message: ' ID is required for this operation' });
                }

                const checkifnotexist = await prisma.billpayable.findFirst({where: {id: +id}})

                if(!checkifnotexist){
                  return res.status(400).json({ success: true, message: 'bill post not found or not created' });
                }
        

            const updatebill = await prisma.billpayable.update({
                where: { id:+id },
                data: {
                    supplierName,
                    supplierAddress,
                     contact,
                     billDate,
                     dueDate ,
                     billAmount ,
                     billNumber  ,
                    billDiscription,
                     paymentMethod ,
                    transactionId , 
                    paymentDate ,
                    paymentAmount ,
                     tax ,
                    comment ,       
                    invoiceNumber  
                },
            })

            if(!updatebill){
                return res.status(404).send({ success: false, message: 'Bill Post Not Found' });
            }

            return res.status(200).json({ success: true, data: updatebill });
            
        } catch (error:any) {
            return res.status(500).json({
                success: false,
                message: 'Error In creating BillPayable',
             });   
        }
    }

    static async deletepayablebill (req: Request, res: Response){
     
      try {
          const { id } = req.params;
  
          if (!id) {
              return res.status(400).json({ success: true, message: ' ID is required for this operation' });
          }

          const checkifnotexist = await prisma.billpayable.findFirst({where: {id: +id}})

          if(!checkifnotexist){
            return res.status(400).json({ success: true, message: 'bill post not found or not created' });
          }
  
  
          const deletebill=await prisma.billpayable.delete({
              where: { id:+id },
          });

         
        
  
          return res.status(200).json({ success: true, message: 'Post deleted' });
     
     
      } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error In delating BillPayable',
         });  
      }
   
    }


    
    }

