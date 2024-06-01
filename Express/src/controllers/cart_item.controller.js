const db = require("../database/index.js");

// Select all cart items from the database.
exports.all = async (req, res) => {
  try {
    const cartItems = await db.CartItems.findAll();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a cart item in the database.
exports.create = async (req, res) => {
  try {
    const cartItem = await db.CartItems.create({
      user_id: req.body.user_id, // Ensure user_id is passed correctly
      product_id: req.body.product_id,
      quantity: req.body.quantity
    });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cart item in the database.
exports.update = async (req, res) => {
  try {
    const cartItem = await db.CartItems.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    cartItem.quantity = req.body.quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a cart item from the database.
exports.delete = async (req, res) => {
  try {
    const cartItem = await db.CartItems.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.json({ message: 'Cart item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
