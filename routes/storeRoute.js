const express = require ("express");
const {isAdmin, authMiddleware}  = require("../middlewares/authMiddleware");
const { createStore, updateStore, getStore, getAllStores, deleteStore } = require("../controllers/storeController");
//const { uploadPhoto, blogImgResize  } = require("../middlewares/uploadimages");
const router = express.Router();

router.post("/", authMiddleware, createStore);
//router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 2), blogImgResize, uploadImages);
router.put("/:id", authMiddleware, isAdmin, updateStore);
router.get("/:id", getStore);
router.get("/", getAllStores);
router.delete("/:id", authMiddleware, isAdmin, deleteStore);


module.exports = router;