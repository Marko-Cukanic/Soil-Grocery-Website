const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Get all products
router.get('/', productController.all);

// Create a new product
router.post('/', productController.create);

module.exports = router;
