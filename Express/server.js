require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./src/database'); // Ensure this path is correct

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Simple route to confirm the server is working
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import and use user routes
const userRoutes = require('./src/routes/user.routes');
app.use('/api/users', userRoutes);

// Import and use product routes
const productRoutes = require('./src/routes/products.routes');
app.use('/api/products', productRoutes);

// Import and use review routes
const reviewRoutes = require('./src/routes/review.routes');
app.use('/api/reviews', reviewRoutes);

// Import and use cart routes
const cartRoutes = require('./src/routes/cart_item.routes');
app.use('/api/cart', cartRoutes);

// Import and use weekly special routes
const weeklySpecialRoutes = require('./src/routes/weekly_specials.routes');
app.use('/api/weekly-specials', weeklySpecialRoutes);

// Database synchronization and server start
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
