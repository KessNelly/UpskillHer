const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  storeName: {
    type: String,
    required: true,
   },
  storeDescription: {
    type: String,
  },
  storeUrl: {
    type: String,
    required: true,
  },
  storeBanner: {
    type: String,
  },          //to take images

}, {
  timestamps: true,
});


module.exports = mongoose.model('Store', storeSchema);

