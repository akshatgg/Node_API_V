import multer from "multer";
import cloudinary from "cloudinary";
import { Request } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "../lib/config";

cloudinary.v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET,
});

const params = {
  folder: (req: Request) => {
    if (req.user) {
      const url = req.url.split("/").at(0);
      return `dashboard/users/${req.user.id}/${url ?? "images"}`;
    }
    const { email } = req.body;
    return `dashboard/careers/${email}`;
  },
  allowedFormats: ["jpeg", "png", "jpg", "pdf"],
  public_id: (req: Request, file: Express.Multer.File) => {
    const originalFileName = file.originalname
      .split(".")
      .at(0)
      ?.substring(0, 5);
    const timestamp = Date.now();
    return `${originalFileName}_${timestamp}`;
  },
};

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params,
});

export const multerInstance = multer({
  storage: cloudinaryStorage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return cb(new Error("Only image and PDF files are allowed!"));
    }
    cb(null, true);
  },
});

type resourceType = "image" | "pdf";

export const getPublicIdByUrl = (url: string) => {
  try {
    const emailWithoutPercentEncoding = url.replace(/%40/g, "@");

    const parts = emailWithoutPercentEncoding.split("/");
    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex !== -1) {
      let publicId = parts.slice(uploadIndex + 2).join("/");
      publicId = publicId.split(".").slice(0, -1).join(".");
      return publicId;
    } else {
      return url;
    }
  } catch (error) {
    return url;
  }
};

export const deleteImageByUrl = async (
  imageUrls: string[],
  type: resourceType = "image"
) => {
  try {
    const publicId = imageUrls.map((url) => getPublicIdByUrl(url));
    const response = await cloudinary.v2.api.delete_resources(publicId, {
      type: "upload",
      resource_type: type,
    });
    return response.deleted[publicId[0]] === "deleted";
  } catch (error) {
    console.log("🚀 ~ deleteImageByPublicId ~ error:", error);
    return false;
  }
};
