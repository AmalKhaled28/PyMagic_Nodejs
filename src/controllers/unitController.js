const Unit = require('../models/unit');

exports.getAllUnits = async (req, res) => {
  try {
    const units = await Unit.findAll();
    res.json(units);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });
    res.json(unit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUnit = async (req, res) => {
  try {
    const newUnit = await Unit.create(req.body);
    res.status(201).json(newUnit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });
    await unit.update(req.body);
    res.json(unit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });
    await unit.destroy();
    res.json({ message: 'Unit deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};