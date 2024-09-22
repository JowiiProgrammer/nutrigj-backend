require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function updatePasswords() {
  try {
    const users = await User.find({});
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      await user.save();
      console.log(`Updated password for user: ${user.email}`);
    }
    console.log('All passwords updated successfully');
  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    mongoose.disconnect();
  }
}

updatePasswords();