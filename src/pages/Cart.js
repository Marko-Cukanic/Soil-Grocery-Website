import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//test commit

export default function Cart() {
  const [cartItems, setCartItems] = useState( // State to store cart items and total price
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {   // Calculate the total price when the component mounts and when cartItems change
    const calculatedTotalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);   
    setTotalPrice(calculatedTotalPrice);

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', calculatedTotalPrice.toFixed(2));
  }, [cartItems]);

    // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent decreasing quantity below 1
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, quantity: newQuantity };
        updatedItem.totalPrice = (updatedItem.price || 0) * newQuantity;
        return updatedItem;
      } else {
        return item;
      }
    });

    // Function to calculate the total price of a single item
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const calculateSingleItemPrice = (item) => {
    return (item.totalPrice || (item.price || 0) * item.quantity).toFixed(2);
  };


  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
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
