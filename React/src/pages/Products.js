import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShoppingItem({ id, name, price, specialPrice, image, handleAddToCart }) {
  // Ensure price and specialPrice are numbers before formatting
  const formattedPrice = !isNaN(price) ? Number(price).toFixed(2) : 'N/A';
  const formattedSpecialPrice = specialPrice && !isNaN(specialPrice) ? Number(specialPrice).toFixed(2) : null;
  const [quantity, setQuantity] = useState(1);

  function handleQuantityChange(e) {
    const newAmount = parseInt(e.target.value);
    if (!isNaN(newAmount) && newAmount >= 1) {
      setQuantity(newAmount);
    } else {
      setQuantity('');
    }
  }

  function handleAddToCartClick() {
    const item = { id, name, price: parseFloat(price), specialPrice: parseFloat(specialPrice), quantity };
    console.log('Item to be added to cart:', item);
    alert(`Added ${item.quantity} ${item.name}(s) to the cart.`);
    handleAddToCart(item);
    setQuantity(1);
  }

  return (
    <div className="item">
      <img src={process.env.PUBLIC_URL + image} alt={name} />
      <div className="itemInfo">
        <h3>{name}</h3>
        <p className="itemPrice">
          {formattedSpecialPrice ? (
            <>
              <del>${formattedPrice}</del> ${formattedSpecialPrice}
            </>
          ) : (
            `$${formattedPrice}`
          )}
        </p>
        <div className="amountAdded">
          <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
          <button onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

function ItemGrid({ items, handleAddToCart }) {
  return (
    <div className="grid-container">
      {items.map(item => (
        <ShoppingItem key={item.id} id={item.id} name={item.name} price={item.price} specialPrice={item.specialPrice} image={item.image} handleAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        setError('Failed to fetch products');
        console.error('Error fetching products:', error);
      });
  }, []);

  function handleAddToCart(item) {
    if (!item || !item.id) {
      console.error('Invalid item or missing ID:', item);
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    cartItems = cartItems.filter(cartItem => cartItem && cartItem.id);

    console.log('Existing cart items:', cartItems);

    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    console.log('Existing item index:', existingItemIndex);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += item.quantity;
    } else {
      cartItems.push({ ...item, quantity: item.quantity, price: item.specialPrice || item.price });
    }

    console.log('Updated cart items:', cartItems);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Added', item.quantity, item.name, 'to cart');
  }

  return (
    <div className="dealsPage">
      <div className="dealsTitle">
        <h1>Organic Produce</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <ItemGrid items={items} handleAddToCart={handleAddToCart} />
    </div>
  );
}
