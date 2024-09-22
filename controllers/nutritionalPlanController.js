const NutritionalPlan = require('../models/NutritionalPlan');

exports.getNutritionalPlan = async (req, res) => {
  try {
    const plan = await NutritionalPlan.findOne({ user: req.user.id }).populate('meals');
    if (!plan) {
      return res.status(404).json({ message: 'Nutritional plan not found' });
    }
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createNutritionalPlan = async (req, res) => {
  try {
    const { meals } = req.body;
    const newPlan = new NutritionalPlan({
      user: req.user.id,
      meals,
    });
    const plan = await newPlan.save();
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateNutritionalPlan = async (req, res) => {
  try {
    const { meals } = req.body;
    const plan = await NutritionalPlan.findOneAndUpdate(
      { user: req.user.id },
      { meals },
      { new: true }
    ).populate('meals');
    if (!plan) {
      return res.status(404).json({ message: 'Nutritional plan not found' });
    }
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};