import multer from "multer";
import cloudinary from "cloudinary";
import { Request } from "express";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import { config } from "../lib/config";

cloudinary.v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET,
});

const params = {
  folder: (req: Request) => {
    if (req.user) {
      return `dashboard/users/${req.user.email}/${req.url.replace("/", "")}`;
    }
    const { email } = req.body;
    return `dashboard/careers/${email}`;
  },
  allowedFormats: ["jpeg", "png", "jpg", "pdf"],
  public_id: (req: Request, file: Express.Multer.File) => {
    const originalFileName = file.originalname.split(".").at(0);
    const timestamp = Date.now();
    return `${originalFileName}_${timestamp}`;
  },
};

const options: Options = {
  cloudinary: cloudinary.v2,
  params,
};

const limits = {
  fileSize: 1 * 1024 * 1024,
};

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
    return cb(new Error("Only image and PDF files are allowed!"));
  }
  cb(null, true);
};

const cloudinaryStorage = new CloudinaryStorage(options);

export const multerInstance = multer({
  storage: cloudinaryStorage,
  limits,
  fileFilter,
});
