const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// Get all reviews
router.get('/', reviewController.all);

// Create a new review
router.post('/', reviewController.create);

module.exports = router;
