const db = require("../models");

// Select all weekly specials from the database.
exports.all = async (req, res) => {
  const weeklySpecials = await db.WeeklySpecial.findAll();
  res.json(weeklySpecials);
};

// Create a weekly special in the database.
exports.create = async (req, res) => {
  const weeklySpecial = await db.WeeklySpecial.create({
    product_id: req.body.product_id,
    discounted_price: req.body.discounted_price
  });
  res.json(weeklySpecial);
};
