const express = require('express');
const router = express.Router();
const Produce = require('../models/produceModel'); 
const Order = require('../models/orderModel');

// Route to search for farm products
const searchProduct = async (req, res) => {
    try {
      const { cropName } = req.query;
  
      // Check if cropName is provided
      if (!cropName) {
        return res.status(400).json({ error: 'Missing cropName parameter' });
      }
      const listings = await Produce.find({ cropName: { $regex: new RegExp(cropName, 'i') } });
  
      if (listings.length === 0) {
        return res.status(404).json({ message: 'No match found for the product' });
      }
  
      const result = listings.map((listing) => ({
        cropName: listing.cropName,
        farmerLocation: listing.farmerLocation,
        price: listing.price,
        quantity: listing.quantity,
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for produce' });
    }
  };
  
  //get all the products available
  
  const getAllProducts= async (req, res) => {
    try {
      const allProducts = await Produce.find(); 
      res.status(200).json(allProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching products' });
    }
  };


// order product



const orderProduct = async (req, res) => {
  const { customer, deliveryAddress, Amount, status } = req.body;

  try {
    const produce = await Produce.findOne({ cropName });

    if (!produce) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (produce.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient quantity available' });
    }

    // Create a new order
    const order = new Order({
      customer,
      deliveryAddress,
      Amount,
      status
      
    });
    await order.save();
    produce.quantity -= quantity;
    await produce.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order failed' });
  }
};

module.exports = {searchProduct,orderProduct,getAllProducts };
  
