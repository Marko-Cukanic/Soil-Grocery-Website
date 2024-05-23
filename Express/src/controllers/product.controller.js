const db = require("../models");

// Select all products from the database.
exports.all = async (req, res) => {
  const products = await db.Product.findAll();
  res.json(products);
};

// Create a product in the database.
exports.create = async (req, res) => {
  const product = await db.Product.create({
    name: req.body.name,
    price: req.body.price,
    specialPrice: req.body.specialPrice,
    image: req.body.image
  });
  res.json(product);
};
