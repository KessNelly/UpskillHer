const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
  },
  farmerLocation: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Add other fields as needed
  harvestDate: {
    type: Date,
    required: true,
  },
 
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel', 
    required: true,
  },
}, {
  timestamps: true,
});

const Produce = mongoose.model('Produce', produceSchema);

module.exports = Produce;
