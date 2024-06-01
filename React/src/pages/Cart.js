import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch cart items from the backend
    axios.get('http://localhost:3000/api/CartItems')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        setError('Failed to fetch cart items');
        console.error('Error fetching cart items:', error);
      });
  }, []);

  useEffect(() => {
    // Calculate the total price when cartItems change
    const calculatedTotalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    axios.delete(`http://localhost:3000/api/CartItems/${itemId}`)
      .then(response => {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
      })
      .catch(error => {
        setError('Failed to remove item from cart');
        console.error('Error removing item from cart:', error);
      });
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent decreasing quantity below 1

    axios.put(`http://localhost:3000/api/CartItems/${itemId}`, { quantity: newQuantity })
      .then(response => {
        const updatedCart = cartItems.map((item) => {
          if (item.id === itemId) {
            const updatedItem = { ...item, quantity: newQuantity };
            updatedItem.totalPrice = (updatedItem.price || 0) * newQuantity;
            return updatedItem;
          } else {
            return item;
          }
        });
        setCartItems(updatedCart);
      })
      .catch(error => {
        setError('Failed to update item quantity');
        console.error('Error updating item quantity:', error);
      });
  };

  const calculateSingleItemPrice = (item) => {
    return (item.totalPrice || (item.price || 0) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {error && <p className="error">{error}</p>}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-actions">
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-price">Price: ${calculateSingleItemPrice(item)}</div>
              </div>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn"><Link to="/payment">Checkout</Link></button>
      </div>
    </div>
  );
}
