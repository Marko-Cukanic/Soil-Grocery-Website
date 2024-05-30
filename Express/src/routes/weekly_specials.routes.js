const express = require('express');
const router = express.Router();
const weeklySpecialsController = require('../controllers/weekly_specials.controller');

router.get('/', weeklySpecialsController.getWeeklySpecials);

module.exports = router;
