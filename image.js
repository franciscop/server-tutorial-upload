// model.js
const mongoose = require('mongoose');
const time = require('time-ago');

// Configure the Mongoose plugin
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/image');

// define the Image schema
const ImageSchema = mongoose.Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
});

ImageSchema.virtual('time').get(function () {
  return time.ago(this._id.getTimestamp());
});

module.exports = mongoose.model('Image', ImageSchema);
