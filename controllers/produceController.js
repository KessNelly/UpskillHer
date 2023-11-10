const express = require('express');
const router = express.Router();
//const multer = require('multer');
const Produce = require('../models/produceModel');
const Farmer = require('../models/userModel');



// Produce routes
const postProduce = async (req, res) => {
  const { cropName, farmer, farmerLocation, quantity, price} = req.body; 

  //const imagePath = req.file ? req.file.path : null;

  try {
    const farmerId = farmer;

    const produce = new Produce({
      cropName,
      farmer: farmerId,
      farmerLocation, 
      quantity,
      price,
      //image: imagePath,
    });

    const savedProduce = await produce.save();
    res.status(201).json(savedProduce);
  } catch (error) {
    res.status(500).json({ error: 'Posting produce failed' });
  }
};

const getProduce = async (req, res) => {
  try {
    const farmerId = req.query.farmer; 

    if (!farmerId) {
      return res.status(400).json({ error: 'Farmer ID is required' });
    }

    const produceListings = await Produce.find({ farmer: farmerId });
    res.status(200).json(produceListings);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching produce' });
  }
};

// update a produce 
const updateProduce = async (req, res) => {
  try {
    const { cropName, farmerLocation, quantity, price, harvestDate } = req.body;
    const produceId = req.params.id;

    const existingProduce = await Produce.findById(produceId);

    if (!existingProduce) {
      return res.status(404).json({ error: 'Produce not found' });
    }
    existingProduce.cropName = cropName;
    existingProduce.farmerLocation = farmerLocation;
    existingProduce.quantity = quantity;
    existingProduce.price = price;
    existingProduce.harvestDate = harvestDate;

    await existingProduce.save();
    res.status(200).json({ message: 'Produce updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Produce update failed' });
  }
};

//  delete a produce 
const deleteProduce = async (req, res) => {
  try {
    const produceId = req.params.id;

    const existingProduce = await Produce.findById(produceId);

    if (!existingProduce) {
      return res.status(404).json({ error: 'Produce not found' });
    }
    await existingProduce.deleteOne(); 
    res.status(200).json({ message: 'Produce deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Produce deletion failed' });
  }
};

module.exports = { getProduce, deleteProduce, postProduce, updateProduce };
