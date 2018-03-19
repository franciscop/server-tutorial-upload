// First configure Cloudinary:
const cloudinary = require('cloudinary');

// Set-up the configuration from the environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Create a middleware to upload any file attached in `ctx.files`
module.exports = async ({ data, files = {} }) => {
  for (const key in files) {
    const res = await cloudinary.uploader.upload(files[key].path);
    data[key] = res.secure_url;
  }
};
