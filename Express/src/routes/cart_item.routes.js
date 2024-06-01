const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cart_item.controller');

// Get all cart items
router.get('/CartItems', cartItemController.all);

// Create a new cart item
router.post('/CartItems', cartItemController.create);

// Update a cart item
router.put('/CartItems/:id', cartItemController.update);

// Delete a cart item
router.delete('/CartItems/:id', cartItemController.delete);

module.exports = router;
