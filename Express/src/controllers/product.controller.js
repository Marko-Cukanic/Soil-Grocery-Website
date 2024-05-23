const db = require('../database/index.js');

// Get all products
exports.all = async (req, res) => {
  const products = await db.Product.findAll();
  res.json(products);
};

// Create a new product
exports.create = async (req, res) => {
  const product = await db.Product.create({
    name: req.body.name,
    price: req.body.price,
    specialPrice: req.body.specialPrice,
    image: req.body.image
  });
  res.json(product);
};
