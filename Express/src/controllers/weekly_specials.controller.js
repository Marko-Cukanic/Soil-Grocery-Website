const db = require('../database');
const { Op } = require('sequelize');

const getRandomProducts = async () => {
  try {
    const products = await db.Product.findAll({
      attributes: ['id', 'name', 'price', 'image'] // Ensure these attributes are fetched
    });
    console.log('Products fetched:', products); // Log fetched products
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  } catch (error) {
    console.error('Error fetching products:', error); // Log errors
    throw error;
  }
};

const storeWeeklySpecials = async (specials) => {
  try {
    // Clear the weekly_specials table before storing new specials
    await db.WeeklySpecial.destroy({ where: {}, truncate: true });

    // Store the new specials
    await db.WeeklySpecial.bulkCreate(specials);
    console.log('Weekly specials stored:', specials); // Log stored specials
  } catch (error) {
    console.error('Error storing weekly specials:', error); // Log errors
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
      console.log(`Original price: ${product.price}, Discounted price: ${discountedPrice}`); // Log original and discounted prices
      specials.push({
        productId: product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.price,
        discountedPrice: parseFloat(discountedPrice.toFixed(2))
      });
    });

    await storeWeeklySpecials(specials);

    res.status(200).json(specials);
  } catch (error) {
    console.error('Error in getWeeklySpecials:', error); // Log errors
    res.status(500).json({ error: 'An error occurred while fetching weekly specials.' });
  }
};

module.exports = { getWeeklySpecials };
