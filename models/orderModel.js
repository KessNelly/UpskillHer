const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
