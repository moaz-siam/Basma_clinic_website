const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

const storage = new multer.memoryStorage();

async function fileUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto", 
    folder: "patient_files",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, fileUploadUtil };