const { User, Asset , UserAsset, UserPreference } = require("../models/index");
const sequelize = require('../config/db');

exports.savePreferences = async (req, res) => {
  try {
    const { userId, ...preferences } = req.body;
    
    const [result] = await UserPreference.upsert({
      user_id: userId,
      ...preferences
    });

    res.json({ success: true, message: "Preferences saved!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUserPreferences = async (req, res) => {
  try {
    const preferences = await UserPreference.findOne({
      where: { user_id: req.params.userId }
    });
    
    res.json(preferences || {});
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOwnedAssets = async (req, res) => {
  try {
    const assets = await UserAsset.findAll({
      where: { user_id: req.params.id },
      include: [{ model: Asset, as: "asset" }]
    });
    
    res.json(assets.map(ua => ua.Asset));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.buyItem = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, assetId } = req.body;

    const [user, asset, existingOwnership] = await Promise.all([
      User.findByPk(userId, { transaction }),
      Asset.findByPk(assetId, { transaction }),
      UserAsset.findOne({
        where: { user_id: userId, asset_id: assetId },
        transaction
      })
    ]);

    if (!user || !asset) {
      await transaction.rollback();
      return res.status(404).json({ message: "User or Asset not found" });
    }

    if (existingOwnership) {
      await transaction.rollback();
      return res.status(400).json({ message: "You already own this item!" });
    }

    if (user.earned_points < asset.price) {
      await transaction.rollback();
      return res.status(400).json({ message: "Not Enough Points!" });
    }

    await user.decrement('earned_points', { by: asset.price, transaction });
    await UserAsset.create({
      user_id: userId,
      asset_id: assetId
    }, { transaction });

    await transaction.commit();
    res.json({ success: true, message: "Item Purchased!" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send(error);
  }
};