const Workout = require('../models/Workout');

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createWorkout = async (req, res) => {
  try {
    const { name, exercises } = req.body;
    const newWorkout = new Workout({
      user: req.user.id,
      name,
      exercises,
    });
    const workout = await newWorkout.save();
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const { name, exercises } = req.body;
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, exercises },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};