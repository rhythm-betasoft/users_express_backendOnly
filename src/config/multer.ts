import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage: CloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "Profile_Pics",
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  })
});

const uploadProfile = multer({ storage });
export default uploadProfile;
