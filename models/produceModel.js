const mongoose = require('mongoose');
const { Schema } = mongoose;

const produceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // farmerLocation: {
  //   type: String,
  //   required: true,
  // },
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
  description: {
    type: Number,
    required: true,
  },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  farmer: {
    type: Schema.Types.ObjectId,
    ref: 'userModel', // Set this to the name of your 'Farmer' model if available
  },
  // image: {
  //   type: String, // Store the image URL or file path
  // },
  deliveryOptions: {
    type:String,
    enum: ["Pickup", "Delivery"],
  },
  produceWeight : {
    type:String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Produce', produceSchema);
