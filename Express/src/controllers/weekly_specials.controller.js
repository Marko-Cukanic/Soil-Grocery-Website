const db = require('../database');
const { Op } = require('sequelize');

const getRandomProducts = async () => {
  try {
    const products = await db.Product.findAll();
    console.log('Products fetched:', products); // Log fetched products
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  } catch (error) {
    console.error('Error fetching products:', error); // Log errors
    throw error;
  }
};

const getWeeklySpecials = async (req, res) => {
  try {
    const products = await getRandomProducts();
    let specials = [];
    
    products.forEach((product, index) => {
      let discount = index === 0 ? 0.5 : 0.2;
      let discountedPrice = product.price * (1 - discount);
      specials.push({
        id: index + 1,
        productId: product.id,
        originalPrice: product.price,
        discountedPrice: parseFloat(discountedPrice.toFixed(2))
      });
    });

    console.log('Weekly specials:', specials); // Log specials

    res.status(200).json(specials);
  } catch (error) {
    console.error('Error in getWeeklySpecials:', error); // Log errors
    res.status(500).json({ error: 'An error occurred while fetching weekly specials.' });
  }
};

module.exports = { getWeeklySpecials };
