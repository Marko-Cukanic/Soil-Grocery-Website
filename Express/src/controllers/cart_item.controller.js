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
    console.log('Create request body:', req.body); // Log the request body for debugging
    const { user_id, product_id, name, quantity, price, totalPrice } = req.body;
    if (!user_id || !product_id || !name || !quantity || !price || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const cartItem = await db.CartItems.create({
      user_id,
      product_id,
      name,
      quantity,
      price,
      totalPrice
    });

    res.json(cartItem);
  } catch (error) {
    console.error('Error creating cart item:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a cart item in the database.
exports.update = async (req, res) => {
  try {
    console.log('Update request body:', req.body); // Log the request body for debugging
    const { quantity, totalPrice } = req.body; // Use totalPrice from the request body
    const { id } = req.params;

    if (!quantity || !id || totalPrice === undefined || totalPrice === null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const cartItem = await db.CartItems.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = totalPrice; // Use totalPrice from the request body

    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
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

