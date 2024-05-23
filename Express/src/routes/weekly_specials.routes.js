const express = require('express');
const router = express.Router();
const weeklySpecialController = require('../controllers/weekly_special.controller');

// Get all weekly specials
router.get('/', weeklySpecialController.all);

// Create a new weekly special
router.post('/', weeklySpecialController.create);

module.exports = router;
