const express = require('express');
const router = express.Router();
//const multer = require('multer');
const Store = require('../models/storeModel');
const Farmer = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbid');
// const cloudinaryUploadImg = require("../utils/cloudinary");
// const fs = require('fs');


//create Store
const createStore = asyncHandler(async(req, res)=>{
    try {
        // const newStore = await Store.create(req.body);
        // res.json(newStore);

        const {storeName, storeDescription, storeUrl, storeBanner} = req.body
        const newStore = await Store.find({id : req.user._farmerId})
        if (!newStore){
            res.json({
                msg: "User does not exist!!!!!",
                
            }) ;
        }
        
       const store = new Store({
        storeName, storeDescription, storeUrl, storeBanner
       })
       await store.save()
        res.json({
            msg: "Store set up successfully!!",
            store
            
        });
    } catch (error) {
        console.error (error)
        throw new Error (error);
    
    }
});

//update Store
const updateStore = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const updateStore = await Store.findByIdAndUpdate(id, req.body, {
            new:true,
        });
        res.json(updateStore);
    } catch (error) {
        throw new Error (error);
    }
});

//get a Store
const getStore = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        // const getStore = await Store.findById(id)
         const getStore = await Farmer.findById(id) //find store based on farmer's id

        res.json(getStore);
    } catch (error) {
        throw new Error (error);
    }
});

//get all Stores
const getAllStores = asyncHandler(async(req,res)=>{
    try {
        const getStores = await Store.find();
        res.json(getStores);
    } catch (error) {
        throw new Error (error);
    }
});

//delete a Store
const deleteStore = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const deletedStore = await Store.findByIdAndDelete(id);
        res.json({
            msg: "Successfully deleted",
            });
    } catch (error) {
        throw new Error (error);
    }
});


module.exports = {createStore, updateStore, deleteStore, getAllStores, getStore,}

