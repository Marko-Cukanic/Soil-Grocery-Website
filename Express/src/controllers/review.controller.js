const db = require("../database");

exports.getAllReviewsForProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await db.Review.findAll({ where: { product_id: productId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addReview = async (req, res) => {
  const { productId } = req.params;
  const { user_id, text, stars } = req.body;
  try {
    const review = await db.Review.create({
      user_id,
      product_id: productId,
      text,
      stars
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { text, stars } = req.body;
  try {
    const review = await db.Review.findByPk(id);
    if (review) {
      review.text = text;
      review.stars = stars;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await db.Review.findByPk(id);
    if (review) {
      await review.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
