import multer from "multer";
import cloudinary from "cloudinary";
import { Request } from "express";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import { config } from "../lib/config";

cloudinary.v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET,
  secure: true,
});

const params = {
  folder: (req: Request) => {
    if (req.user) {
      return `dashboard/users/${req.user.id}`;
    }
    const { email } = req.body;
    return `dashboard/careers/${email}`;
  },
  allowedFormats: ["jpeg", "png", "jpg"],
  public_id: (req: Request, file: Express.Multer.File) => {
    const originalFileName = file.originalname.split(".").at(0); // Extracting the original file name without extension
    const timestamp = Date.now(); // Getting current timestamp
    return `${originalFileName}_${timestamp}`; // Combining original file name and timestamp
  },
};

const options: Options = {
  cloudinary: cloudinary.v2,
  params,
};

const limits = {
  fileSize: 3 * 1024 * 1024, // 3 MB in bytes
};

// Add file filter for image files
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

const cloudinaryStorage = new CloudinaryStorage(options);

export const multerInstance = multer({
  storage: cloudinaryStorage,
  limits,
  fileFilter,
});
