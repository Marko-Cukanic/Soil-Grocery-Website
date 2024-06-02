const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors'); // Import the cors package
const schema = require('./schema');
const mysql = require('mysql');

const app = express();

// Use CORS middleware
app.use(cors());


let db = mysql.createConnection({
    host: 'rmit.australiaeast.cloudapp.azure.com',
    user: 's4007708_fsd_a2',
    password: 'p21092004!',
    database: 's4007708_fsd_a2'
  });
  
  function handleDisconnect() {
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
      } else {
        console.log('MySQL connected...');
      }
    });
  
    db.on('error', (err) => {
      console.error('MySQL error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
      } else {
        throw err;
      }
    });
  }
  
  handleDisconnect();

const root = {
    users: () => { // Changed from Users to users
      console.log("Fetching users...");
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Users', (err, results) => {
          if (err) {
            console.error("Error fetching users:", err);
            reject(err);
          }
          console.log("Fetched users:", results);
          resolve(results);
        });
      });
    },
    products: () => {
      console.log("Fetching products...");
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (err, results) => {
          if (err) {
            console.error("Error fetching products:", err);
            reject(err);
          }
          console.log("Fetched products:", results);
          resolve(results);
        });
      });
    },
    blockUser: ({ id }) => {
      console.log(`Blocking user with id ${id}...`);
      return new Promise((resolve, reject) => {
        db.query('UPDATE Users SET blocked = true WHERE id = ?', [id], (err, results) => {
          if (err) {
            console.error("Error blocking user:", err);
            reject(err);
          }
          console.log(`Blocked user with id ${id}`);
          resolve({ id });
        });
      });
    },
    unblockUser: ({ id }) => {
      console.log(`Unblocking user with id ${id}...`);
      return new Promise((resolve, reject) => {
        db.query('UPDATE Users SET blocked = false WHERE id = ?', [id], (err, results) => {
          if (err) {
            console.error("Error unblocking user:", err);
            reject(err);
          }
          console.log(`Unblocked user with id ${id}`);
          resolve({ id });
        });
      });
    },
    addProduct: ({ name, price, specialPrice, image }) => {
      console.log(`Adding product with name ${name}, price ${price}, specialPrice ${specialPrice}, and image ${image}...`);
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO products (name, price, specialPrice, image) VALUES (?, ?, ?, ?)', [name, price, specialPrice, image], (err, results) => {
          if (err) {
            console.error("Error adding product:", err);
            reject(err);
          }
          console.log("Added product:", { id: results.insertId, name, price, specialPrice, image });
          resolve({ id: results.insertId, name, price, specialPrice, image });
        });
      });
    },
    editProduct: ({ id, name, price, specialPrice, image }) => {
      console.log(`Editing product with id ${id}, name ${name}, price ${price}, specialPrice ${specialPrice}, and image ${image}...`);
      return new Promise((resolve, reject) => {
        db.query('UPDATE products SET name = ?, price = ?, specialPrice = ?, image = ? WHERE id = ?', [name, price, specialPrice, image, id], (err, results) => {
          if (err) {
            console.error("Error editing product:", err);
            reject(err);
          }
          console.log("Edited product:", { id, name, price, specialPrice, image });
          resolve({ id, name, price, specialPrice, image });
        });
      });
    },
    deleteProduct: ({ id }) => {
      console.log(`Deleting product with id ${id}...`);
      return new Promise((resolve, reject) => {
        db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
          if (err) {
            console.error("Error deleting product:", err);
            reject(err);
          }
          console.log("Deleted product with id", id);
          resolve({ id });
        });
      });
    }
  };
  
  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }));
  
  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
  