const mongoose = require('mongoose');
const time = require('time-ago');

// Configure the Mongoose plugin
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/image');

// Define a simple Image schema
const ImageSchema = mongoose.Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
});

// This does not exist in the DB but can be infered from the ID; we'll also
// make it pretty with "time-ago". See _id => timestamp conversion:
// https://docs.mongodb.com/manual/reference/method/ObjectId.getTimestamp/
ImageSchema.virtual('time').get(function () {
  return time.ago(this._id.getTimestamp());
});

// Create and export the model so we can use the DB
module.exports = mongoose.model('Image', ImageSchema);
