import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default cloudinary;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Cant upload this file. Image only"));
    }
  },
});

export const UploadToCloudinary = (imageFolder, fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `Social_Media/${imageFolder}`,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          resolve(result);
        }
      },
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
