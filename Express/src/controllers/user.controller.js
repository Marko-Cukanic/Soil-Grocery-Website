const db = require("../models");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.body.email } });
  if (user && await argon2.verify(user.password, req.body.password)) {
    res.json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  const user = await db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    activityLevel: req.body.activityLevel,
    dietaryPreferences: req.body.dietaryPreferences,
    healthGoals: req.body.healthGoals
  });
  res.json(user);
};
