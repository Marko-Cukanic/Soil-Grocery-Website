const express = require('express');
const { followUser, unfollowUser } = require('../controllers/follow.controller');
const router = express.Router();

router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);

module.exports = router;
