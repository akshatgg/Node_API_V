import { Request, Response } from "express";
import { prisma } from "../index";
import { RegisterStartup } from "@prisma/client";
import { ZodError, z } from "zod";
import { deleteImageByUrl } from "../config/cloudinaryUploader";

const categoriesType = z.enum([
  "registration",
  "companyRegistration",
  "returns",
  "audits",
]);

const startupCreateSchema = z.object({
  title: z.string(),
  categories: categoriesType,
  image: z.string().optional(),
  priceWithGst: z.string().min(1, "priceWithGst is required"),
  aboutService: z.string().min(1, "aboutService is required"),
});

export class RegisterStartupController {
  static async RegisterStartup(req: Request, res: Response) {
    try {
      const imageUrl: string = req.file?.path as string;
      // Data validation;
      const { title, categories, aboutService, priceWithGst } =
        startupCreateSchema.parse(req.body);
  
      if (!imageUrl) {
        return res.status(400).json({ error: "Image is required" });
      }
  
      const { id: userId } = req.user!;
  
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // First, try to get the maximum ID to determine the next available ID
      const maxIdResult = await prisma.$queryRaw`SELECT MAX(id) FROM "RegisterStartup"`;
      const maxId = maxIdResult[0]?.max || 0;
      const nextId = maxId + 1;
      
      // Use raw SQL to insert with explicit ID and RETURNING * to get the created record
      const insertResult = await prisma.$queryRaw`
        INSERT INTO "RegisterStartup" (id, title, image, "userId", categories, "aboutService", "priceWithGst") 
        VALUES (${nextId}, ${title}, ${imageUrl}, ${userId}, ${categories}, ${aboutService}, ${parseInt(priceWithGst, 10)})
        RETURNING *;
      `;
  
      // The result is an array, get the first element
      const createdRecord = insertResult[0];
  
      return res.status(201).json({
        result: createdRecord,
        message: "Successfully Register Startup Setting created",
      });
    } catch (error) {
      console.error("RegisterStartup Error:", error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.message,
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        errors: error instanceof Error ? error.message : error,
      });
    }
  }

  static async findAllStartup(req: Request, res: Response) {
    try {
      const AllStartup = await prisma.registerStartup.findMany({});

      return res.status(200).json({ success: true, AllStartup });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        errors: error,
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Get the invoice by ID
      const Startup: RegisterStartup | null =
        await prisma.registerStartup.findUnique({
          where: { id: parseInt(id) },
        });

      if (!Startup) {
        return res
          .status(404)
          .json({ sucess: false, message: "Startup not found" });
      }

      return res.status(200).json(Startup);
    } catch (error) {
      return res
        .status(500)
        .json({ sucess: false, message: "Internal server error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedStartup = await prisma.registerStartup.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({
        success: true,
        deletedStartup,
        message: "Register Startup deleted sucessfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const { title, categories, aboutService, priceWithGst } =
        startupCreateSchema.parse(req.body);

      const image: string = req.file?.path as string;
      const { id: userId } = req.user!;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Required Query title name was not provided",
        });
      }
      if (!categories) {
        return res.status(400).json({
          success: false,
          message: "Required Query categories was not provided",
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const existingStartup = await prisma.registerStartup.findFirst({
        where: { id: parseInt(id) },
      });

      if (existingStartup?.image && image) {
        await deleteImageByUrl([existingStartup.image]);
      }

      const updatedStartup = await prisma.registerStartup.update({
        where: { id: parseInt(id) },
        data: {
          title,
          categories,
          userId,
          image: image ?? existingStartup?.image,
          aboutService,
          priceWithGst: parseInt(priceWithGst, 10),
        },
      });

      return res.status(200).json({
        success: true,
        updatedStartup,
        message: "Register Startup deleted sucessfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
