const db = require("../database/index.js");

// Select all cart items from the database.
exports.all = async (req, res) => {
  const cartItems = await db.CartItem.findAll();
  res.json(cartItems);
};

// Create a cart item in the database.
exports.create = async (req, res) => {
  const cartItem = await db.CartItem.create({
    product_id: req.body.product_id,
    quantity: req.body.quantity
  });
  res.json(cartItem);
};
