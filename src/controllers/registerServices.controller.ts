import { Request, Response } from "express";
import { prisma } from "../index";
import { Prisma, RegisterServices } from "@prisma/client";
import { ZodError, z } from "zod";
import { deleteImageByUrl, uploadToCloudinary } from "../config/cloudinaryUploader";

const servicesCreateSchema = z.object({
  serviceId: z.string().transform((n) => parseInt(n, 10)),
});

export class RegisterServicesController {
// Updated registerService method with Cloudinary integration
static async registerService(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { serviceId } = servicesCreateSchema.parse(req.body);
    const { aadhaarCard, panCard, gstCertificate, photo } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Validate that all required files are present
    if (!aadhaarCard?.[0] || !panCard?.[0] || !gstCertificate?.[0] || !photo?.[0]) {
      return res.status(400).json({
        success: false,
        message: "All required files (aadhaarCard, panCard, gstCertificate, photo) must be uploaded",
      });
    }

    // Upload files to Cloudinary
    const [aadhaarUpload, panUpload, gstUpload, photoUpload] = await Promise.all([
      uploadToCloudinary(
        aadhaarCard[0].path, 
        aadhaarCard[0].mimetype.startsWith('image/') ? "image" : "raw", 
        req, 
        aadhaarCard[0]
      ),
      uploadToCloudinary(
        panCard[0].path, 
        panCard[0].mimetype.startsWith('image/') ? "image" : "raw", 
        req, 
        panCard[0]
      ),
      uploadToCloudinary(
        gstCertificate[0].path, 
        gstCertificate[0].mimetype.startsWith('image/') ? "image" : "raw", 
        req, 
        gstCertificate[0]
      ),
      uploadToCloudinary(
        photo[0].path, 
        "image", 
        req, 
        photo[0]
      ),
    ]);

    // Create service registration record with Cloudinary URLs
    const newService: RegisterServices = await prisma.registerServices.create({
      data: {
        serviceId,
        userId,
        aadhaarCard: aadhaarUpload.secure_url,
        panCard: panUpload.secure_url,
        gstCertificate: gstUpload.secure_url,
        photo: photoUpload.secure_url,
      },
    });

    return res.status(201).json({
      success: true,
      result: newService,
      message: "Service registered successfully",
    });
  } catch (error) {
    console.error("Service registration error:", error);
    
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }

    // Handle Cloudinary upload errors
    if (error instanceof Error && error.message.includes("Cloudinary")) {
      return res.status(500).json({
        success: false,
        message: "File upload failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

  static async findAllServices(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const whereClause: Prisma.RegisterServicesWhereInput = {};

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Invalid Request",
        });
      }

      if (req.user?.userType === "normal") {
        whereClause["userId"] = userId;
      }

      // Pagination parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const allServices = await prisma.registerServices.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              firstName: true,
              middleName: true,
              lastName: true,
              email: true,
              phone: true,
              id: true,
              address: true,
            },
          },
          registerStartup: {
            select: {
              title: true,
              priceWithGst: true,
              categories: true,
            },
          },
        },
        skip,
        take: limit,
      });

      // Total count for pagination info
      const totalCount = await prisma.registerServices.count({
        where: whereClause,
      });

      return res.status(200).json({
        success: true,
        data: allServices,
        pagination: {
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          pageSize: limit,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error && error.toString(),
      });
    }
  }

  static async getServiceById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const service = await prisma.registerServices.findUnique({
        where: { id: parseInt(id) },
      });

      if (!service) {
        return res
          .status(404)
          .json({ success: false, message: "Service not found" });
      }

      return res.status(200).json({ success: true, data: service });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error && error.toString(),
      });
    }
  }

  static async deleteService(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { aadhaarCard, gstCertificate, panCard, photo } =
        await prisma.registerServices.delete({
          where: { id: parseInt(id) },
        });

      await deleteImageByUrl([aadhaarCard, gstCertificate, panCard, photo]);

      return res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error && error.toString(),
      });
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const { serviceId } = servicesCreateSchema.parse(req.body);
      const { aadhaarCard, panCard, gstCertificate, photo } = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const updatedService = await prisma.registerServices.update({
        where: { id: parseInt(id) },
        data: {
          serviceId,
          userId,
          aadhaarCard: aadhaarCard ? aadhaarCard[0].path : undefined,
          panCard: panCard ? panCard[0].path : undefined,
          gstCertificate: gstCertificate ? gstCertificate[0].path : undefined,
          photo: photo ? photo[0].path : undefined,
        },
      });

      return res.status(200).json({
        success: true,
        data: updatedService,
        message: "Service updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error && error.toString(),
      });
    }
  }
}
