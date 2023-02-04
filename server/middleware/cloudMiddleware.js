import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (file) => {
  try {
    console.log(file);
    const result = await cloudinary.uploader.upload(file);
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};
