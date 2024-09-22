const Meal = require('../models/Meal');

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id });
    res.json(meals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat } = req.body;
    const newMeal = new Meal({
      user: req.user.id,
      name,
      calories,
      protein,
      carbs,
      fat,
    });
    const meal = await newMeal.save();
    res.json(meal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat } = req.body;
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, calories, protein, carbs, fat },
      { new: true }
    );
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json(meal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json({ message: 'Meal deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};