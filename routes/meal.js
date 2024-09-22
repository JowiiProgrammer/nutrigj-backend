const express = require('express');
const router = express.Router();
const {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/mealController');
const auth = require('../middleware/auth');

router.get('/', auth, getMeals);
router.post('/', auth, createMeal);
router.put('/:id', auth, updateMeal);
router.delete('/:id', auth, deleteMeal);

module.exports = router;