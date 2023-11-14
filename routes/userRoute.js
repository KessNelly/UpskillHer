const express = require('express');
const router = express.Router();
// const multer = require('multer');
//const authenticate = require('../middlewares/authMiddleware'); 

const { searchProduct, orderProduct, getAllProducts } = require('../controllers/customerController');
const { postProduce, getProduce, updateProduce, deleteProduce } = require('../controllers/produceController');

// Customer routes
router.get('/search', searchProduct);
router.post('/order', orderProduct);
router.get('/getAllProducts', getAllProducts);

;
// Farmer routes to manage produce
router.post('/postProduce',postProduce);
router.get('/getProduce', getProduce);
router.put('/updateProduce/:id', updateProduce);
router.delete('/deleteProduce/:id',deleteProduce);

module.exports = router;
