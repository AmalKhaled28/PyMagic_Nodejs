// const Reward = require('../models/reward');

// exports.getAllRewards = async (req, res) => {
//     try {
//         const rewards = await Reward.findAll();
//         res.json(rewards);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getRewardById = async (req, res) => {
//     try {
//         const reward = await Reward.findByPk(req.params.id);
//         if (!reward) return res.status(404).json({ message: 'Reward not found' });
//         res.json(reward);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.createReward = async (req, res) => {
//     try {
//         const reward = await Reward.create(req.body);
//         res.status(201).json(reward);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.updateReward = async (req, res) => {
//     try {
//         const reward = await Reward.findByPk(req.params.id);
//         if (!reward) return res.status(404).json({ message: 'Reward not found' });

//         await reward.update(req.body);
//         res.json(reward);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.deleteReward = async (req, res) => {
//     try {
//         const reward = await Reward.findByPk(req.params.id);
//         if (!reward) return res.status(404).json({ message: 'Reward not found' });

//         await reward.destroy();
//         res.json({ message: 'Reward deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
