const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cart_item.controller');

// Get all cart items
router.get('/', cartItemController.all);

// Create a new cart item
router.post('/', cartItemController.create);

module.exports = router;
