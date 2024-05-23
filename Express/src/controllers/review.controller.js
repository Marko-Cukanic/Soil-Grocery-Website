const db = require("../database/index.js");

// Select all reviews from the database.
exports.all = async (req, res) => {
  const reviews = await db.Review.findAll();
  res.json(reviews);
};

// Create a review in the database.
exports.create = async (req, res) => {
  const review = await db.Review.create({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    text: req.body.text,
    stars: req.body.stars
  });
  res.json(review);
};
