// First configure Cloudinary:
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Create a middleware to upload any file attached in `ctx.files`
module.exports = async ctx => {
  if (!ctx.files || !Object.keys(ctx.files).length) return;
  for (const key in ctx.files) {
    const res = await cloudinary.uploader.upload(ctx.files[key].path);
    ctx.data[key] = res.secure_url;
  }
};
