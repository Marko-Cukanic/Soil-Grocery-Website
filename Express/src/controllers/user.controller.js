const db = require('../database/index.js');
const argon2 = require('argon2');

// Select all users from the database.
exports.all = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select one user from the database.
exports.one = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user && await argon2.verify(user.password, req.body.password)) {
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          weight: user.weight,
          height: user.height,
          activityLevel: user.activityLevel,
          dietaryPreferences: user.dietaryPreferences,
          healthGoals: user.healthGoals
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await db.User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
    const user = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      dateJoined: req.body.dateJoined,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      activityLevel: req.body.activityLevel,
      dietaryPreferences: req.body.dietaryPreferences,
      healthGoals: req.body.healthGoals
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
