// controllers/achievementController.js
const Achievement = require('../models/achievement');
const Reward = require('../models/reward');
const User = require('../models/user');
const { Op } = require('sequelize');

class AchievementController {
  static async getUserAchievements(req, res) {
    try {
      const achievements = await Achievement.findAll({
        where: { user_id: req.params.userId },
        include: [{ model: Reward, as: 'reward', attributes: ['text', 'image', 'required_points'] }]
      });
      
      const formattedAchievements = achievements.map(achievement => ({
        id: achievement.id,
        title: achievement.reward.text,
        description: `Unlocked at ${achievement.reward.required_points} points`,
        image: achievement.reward.image
      }));

      res.json({ success: true, achievements: formattedAchievements });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }

  static async checkAndUnlockAchievements(req, res) {
    try {
        const userId = req.params.userId || req.body.user_id; // Try to get userId from params or body
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
                description: `Unlocked at ${reward.required_points} points`,
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