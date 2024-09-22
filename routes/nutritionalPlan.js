const express = require('express');
const router = express.Router();
const {
  getNutritionalPlan,
  createNutritionalPlan,
  updateNutritionalPlan,
} = require('../controllers/nutritionalPlanController');
const auth = require('../middleware/auth');

router.get('/', auth, getNutritionalPlan);
router.post('/', auth, createNutritionalPlan);
router.put('/', auth, updateNutritionalPlan);

module.exports = router;