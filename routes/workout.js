const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const auth = require('../middleware/auth');

router.get('/', auth, getWorkouts);
router.post('/', auth, createWorkout);
router.put('/:id', auth, updateWorkout);
router.delete('/:id', auth, deleteWorkout);

module.exports = router;