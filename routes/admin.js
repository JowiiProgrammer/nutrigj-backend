const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { validateRegister } = require('../utils/validation');

router.post('/register', [auth, validateRegister], (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  register(req, res, next);
});

module.exports = router;