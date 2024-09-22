const mongoose = require('mongoose');

const NutritionalPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('NutritionalPlan', NutritionalPlanSchema);