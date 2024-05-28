import { Request, Response } from "express";
import { prisma } from "../index";
import { Prisma, RegisterServices } from "@prisma/client";
import { ZodError, z } from "zod";
import { deleteImageByUrl } from "../config/cloudinaryUploader";

const servicesCreateSchema = z.object({
  serviceId: z.string().transform((n) => parseInt(n, 10)),
});

export class RegisterServicesController {
  static async registerService(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Token not found",
        });
      }

      const { serviceId } = servicesCreateSchema.parse(req.body);
      const { aadhaarCard, panCard, gstCertificate, photo } = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const newService: RegisterServices = await prisma.registerServices.create(
        {
          data: {
            serviceId,
            userId,
            aadhaarCard: aadhaarCard[0].path,
            panCard: panCard[0].path,
            gstCertificate: gstCertificate[0].path,
            photo: photo[0].path,
          },
        }
      );

      return res.status(201).json({
        success: true,
        result: newService,
        message: "Service registered successfully",
      });
    } catch (error) {
      // Explicitly type 'error' as 'any' or specify the exact type
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error && error.toString(),
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
