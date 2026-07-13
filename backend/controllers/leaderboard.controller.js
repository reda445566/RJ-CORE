import asyncHandler from 'express-async-handler';
import Points from '../models/points.model.js';
import Achievement, {
  ACHIEVEMENTS,
} from '../models/achievement.model.js';
import StudySession from '../models/studySession.model.js';

// Weekly Leaderboard 
export const getWeeklyLeaderboard = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const leaderboard = await Points.find()
    .sort({ weeklyTotal: -1 })
    .limit(Number(limit))
    .populate('user', 'name avatar');

  const ranked = leaderboard.map((entry, index) => ({
    rank: index + 1,
    user: entry.user,
    weeklyPoints: entry.weeklyTotal,
    totalPoints: entry.total,
  }));

  res.json({
    success: true,
    data: ranked,
  });
});

// All Time Leaderboard
export const getAllTimeLeaderboard = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const leaderboard = await Points.find()
    .sort({ total: -1 })
    .limit(Number(limit))
    .populate('user', 'name avatar');

  const ranked = leaderboard.map((entry, index) => ({
    rank: index + 1,
    user: entry.user,
    totalPoints: entry.total,
  }));

  res.json({
    success: true,
    data: ranked,
  });
});

// My Rank 
export const getMyRank = asyncHandler(async (req, res) => {
  const myPoints = await Points.findOne({
    user: req.user._id,
  });

  if (!myPoints) {
    return res.json({
      success: true,
      data: {
        rank: null,
        points: 0,
      },
    });
  }

  const rank = await Points.countDocuments({
    weeklyTotal: {
      $gt: myPoints.weeklyTotal,
    },
  });

  res.json({
    success: true,
    data: {
      rank: rank + 1,
      weeklyPoints: myPoints.weeklyTotal,
      totalPoints: myPoints.total,
    },
  });
});

// ==================== Award Points (Internal) ====================
export const awardPoints = async (
  userId,
  amount,
  reason
) => {
  let userPoints = await Points.findOne({
    user: userId,
  });

  if (!userPoints) {
    userPoints = await Points.create({
      user: userId,
    });
  }

  await userPoints.addPoints(amount, reason);
};

// ==================== My Achievements ====================
export const getMyAchievements = asyncHandler(
  async (req, res) => {
    const earned = await Achievement.find({
      user: req.user._id,
    });

    const earnedKeys = earned.map(
      (achievement) => achievement.key
    );

    const locked = ACHIEVEMENTS.filter(
      (achievement) =>
        !earnedKeys.includes(achievement.key)
    );

    res.json({
      success: true,
      data: {
        earned,
        locked,
      },
    });
  }
);

// ==================== Check & Award Achievements ====================
export const checkAndAwardAchievements = async (
  userId
) => {
  try {
    const points = await Points.findOne({
      user: userId,
    });

    const sessions =
      await StudySession.countDocuments({
        participants: userId,
        status: 'ended',
      });

    const toCheck = [
      {
        key: 'study_streak_7',
        condition: sessions >= 7,
      },
      {
        key: 'social_learner',
        condition: sessions >= 5,
      },
      {
        key: 'top_student',
        condition: points?.total >= 500,
      },
    ];

    for (const item of toCheck) {
      if (!item.condition) continue;

      const exists =
        await Achievement.findOne({
          user: userId,
          key: item.key,
        });

      if (exists) continue;

      const meta = ACHIEVEMENTS.find(
        (achievement) =>
          achievement.key === item.key
      );

      await Achievement.create({
        user: userId,
        ...meta,
      });

      await awardPoints(
        userId,
        meta.points,
        'achievement'
      );
    }
  } catch (err) {
    console.error(
      'Achievement check failed:',
      err
    );
  }
};

