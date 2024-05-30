const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Get all products
router.get('/', productController.getAllProducts);

// Create a new product
router.post('/', productController.create);

module.exports = router;
