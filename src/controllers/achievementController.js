// controllers/achievementController.js
const Achievement = require('../models/achievement');
const Reward = require('../models/reward');
const RewardTranslation = require('../models/reward_translations');
const User = require('../models/user');

const { Op } = require('sequelize');

class AchievementController {

static async getUserAchievements(req, res) {
  try {
      const { userId } = req.params;
      const language = req.headers['accept-language'] || 'en';

      if (!userId) {
          return res.status(400).json({ 
              success: false, 
              code: 'MISSING_USER_ID',
              message: 'User ID is required' 
          });
      }

      // Verify user exists
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ 
              success: false, 
              code: 'USER_NOT_FOUND',
              message: 'User not found' 
          });
      }

      // Fetch achievements with translations
      const achievements = await Achievement.findAll({
          where: { user_id: userId },
          include: [
              {
                  model: Reward,
                  as: 'reward',
                  include: [
                      {
                          model: RewardTranslation,
                          as: 'translations',
                          where: { language },
                          required: false,
                          attributes: ['text'] // Removed 'image' from attributes
                      }
                  ]
              }
          ],
          order: [['created_at', 'DESC']]
      });

      // Format the response data
      const formattedAchievements = achievements.map(achievement => {
          const translation = achievement.reward.translations?.[0] || {};
          
          return {
              id: achievement.id,
              title: translation.text || achievement.reward.text || 'Achievement',
              image: achievement.reward.image || '', // Use the image from the Reward table
              points_required: achievement.reward.required_points,
              unlocked_at: achievement.created_at
          };
      });

      res.json({ 
          success: true, 
          achievements: formattedAchievements,
          total_points: user.earned_points,
          total_achievements: achievements.length
      });

  } catch (error) {
      console.error('Error in getUserAchievements:', error);
      res.status(500).json({ 
          success: false, 
          code: 'SERVER_ERROR',
          message: 'Failed to fetch achievements',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
}

  static async checkAndUnlockAchievements({ userId }) {
    try {
        // const userId = req.params.userId || req.body.user_id; // Try to get userId from params or body
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const rewards = await Reward.findAll({
            where: { required_points: { [Op.lte]: user.earned_points } },
            order: [['required_points', 'ASC']]
        });

        const existingAchievements = await Achievement.findAll({
            where: { user_id: user.id }
        });

        const achievementsToUnlock = rewards.filter(reward => 
            !existingAchievements.some(ach => ach.reward_id === reward.id)
        );

        const newAchievements = [];
        for (const reward of achievementsToUnlock) {
            await Achievement.create({
                user_id: user.id,
                reward_id: reward.id
            });
            newAchievements.push({
                id: reward.id,
                title: reward.text,
                // description: `Unlocked at ${reward.required_points} points`,
                image: reward.image
            });
        }

        // Return the response instead of sending it directly
        return { success: true, message: "Achievements checked and unlocked if applicable", achievements: newAchievements };
    } catch (error) {
        // Throw the error to be caught by the calling function
        throw new Error(error.message || "Server error");
    }
}}


module.exports = AchievementController;