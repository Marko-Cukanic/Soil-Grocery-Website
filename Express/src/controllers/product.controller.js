const db = require('../database/index.js');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();

    // Ensure prices are numbers
    const validatedProducts = products.map(product => ({
      ...product.toJSON(),
      price: parseFloat(product.price),
      specialPrice: product.specialPrice ? parseFloat(product.specialPrice) : null,
    }));

    res.json(validatedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product
exports.create = async (req, res) => {
  try {
    const { name, price, specialPrice, image } = req.body;

    // Validate and convert prices to numbers
    const validatedPrice = parseFloat(price);
    const validatedSpecialPrice = specialPrice ? parseFloat(specialPrice) : null;

    if (isNaN(validatedPrice) || (specialPrice && isNaN(validatedSpecialPrice))) {
      return res.status(400).json({ error: 'Invalid price format' });
    }

    const product = await db.Product.create({
      name,
      price: validatedPrice,
      specialPrice: validatedSpecialPrice,
      image
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
