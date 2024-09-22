const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Function to create a user
async function createUser(email, password, role) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: hashedPassword,
    role
  });

  await user.save();
  console.log(`User created: ${email} (${role})`);
}

// Connect to MongoDB
mongoose.connect('mongodb+srv://jowiigamer07:rsOnDLDgY7Got1w4@nutrigj.ddxun.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Create users
async function createUsers() {
  try {
    await createUser('admin@example.com', 'adminpassword', 'admin');
    await createUser('user1@example.com', 'userpassword1', 'user');
    await createUser('user2@example.com', 'userpassword2', 'user');
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    mongoose.disconnect();
  }
}

createUsers();