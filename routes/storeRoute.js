const express = require ("express");
const {isAdmin, authMiddleware}  = require("../middlewares/authMiddleware");
const { createStore, updateStore, getStore, getAllStores, deleteStore } = require("../controllers/storeController");
//const { uploadPhoto, blogImgResize  } = require("../middlewares/uploadimages");
const router = express.Router();

router.post("/", authMiddleware, createStore);
//router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 2), blogImgResize, uploadImages);
//router.put("/:id", authMiddleware, updateStore);
router.get("/:id", authMiddleware , getStore);
//router.get("/", getAllStores);
router.delete("/:id", authMiddleware,deleteStore);

 
module.exports = router;