const express = require('express');
const router = express.Router();
const {searchProduct,orderProduct,getAllProducts} = require('../controllers/customerController');

router.get('/search?',searchProduct );
router.post('/order', orderProduct);
router.get('/getAllProducts',getAllProducts);


module.exports = router;
