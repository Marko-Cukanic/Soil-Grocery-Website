const express = require('express');
const controller = require('../controllers/review.controller');
const router = express.Router();

// Get all reviews for a product
router.get('/product/:productId', controller.getAllReviewsForProduct);

// Create a new review for a product
router.post('/product/:productId', controller.addReview);

// Update a review
router.put('/:id', controller.updateReview);

// Delete a review
router.delete('/:id', controller.deleteReview);

module.exports = router;
