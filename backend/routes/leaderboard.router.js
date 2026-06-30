const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/weekly',           authenticate, leaderboardController.getWeeklyLeaderboard);
router.get('/all-time',         authenticate, leaderboardController.getAllTimeLeaderboard);
router.get('/me',               authenticate, leaderboardController.getMyRank);
router.get('/achievements/me',  authenticate, leaderboardController.getMyAchievements);

module.exports = router;