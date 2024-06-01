const db = require('../database');
const { Op } = require('sequelize');

const getRandomProducts = async () => {
  try {
    const products = await db.Product.findAll({
      attributes: ['id', 'name', 'price', 'image']
    });
    console.log('Products fetched:', products);
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const storeWeeklySpecials = async (specials) => {
  try {
    await db.WeeklySpecial.destroy({ where: {}, truncate: true });
    await db.WeeklySpecial.bulkCreate(specials);
    console.log('Weekly specials stored:', specials);
  } catch (error) {
    console.error('Error storing weekly specials:', error);
    throw error;
  }
};

const updateProductSpecialPrices = async (specials) => {
  try {
    // Reset specialPrice for all products
    await db.Product.update(
      { specialPrice: null },
      { where: { specialPrice: { [Op.not]: null } } }
    );

    // Update specialPrice for selected specials
    for (let special of specials) {
      await db.Product.update(
        { specialPrice: special.discountedPrice },
        { where: { id: special.productId } }
      );
    }
    console.log('Products special prices updated:', specials);
  } catch (error) {
    console.error('Error updating product special prices:', error);
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
      console.log(`Original price: ${product.price}, Discounted price: ${discountedPrice}`);
      specials.push({
        productId: product.id,
        name: product.name,
        image: product.image,
        originalPrice: parseFloat(product.price),
        discountedPrice: parseFloat(discountedPrice.toFixed(2))
      });
    });

    await storeWeeklySpecials(specials);
    await updateProductSpecialPrices(specials);

    res.status(200).json(specials);
  } catch (error) {
    console.error('Error in getWeeklySpecials:', error);
    res.status(500).json({ error: 'An error occurred while fetching weekly specials.' });
  }
};

module.exports = { getWeeklySpecials };
