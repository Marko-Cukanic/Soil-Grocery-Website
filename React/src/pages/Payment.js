import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Payment() {
  // State variables for card details and errors
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  // State variables for cart items and total price
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  useEffect(() => {
    // Fetch cart items from the backend
    axios.get('http://localhost:3000/api/CartItems')
      .then(response => {
        setCartItems(response.data);

        // Calculate the total price based on cart items
        const calculatedTotalPrice = response.data.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(calculatedTotalPrice);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    setCardNumber(input);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 4) {
      input = input.slice(0, 4);
    }
    if (input.length >= 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    setExpiryDate(input);
  };

  const handleCvvChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    setCvv(input);
  };

  const validateCardNumber = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateExpiryDate = (date) => {
    const [month, year] = date.split('/').map((x) => parseInt(x, 10));
    if (month < 1 || month > 12 || !year) {
      return false;
    }
    const now = new Date();
    const expiry = new Date(`20${year}`, month - 1);
    return expiry > now;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (cardNumber.length !== 16 || !validateCardNumber(cardNumber)) {
      errors.cardNumber = 'Invalid card number';
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate) || !validateExpiryDate(expiryDate)) {
      errors.expiryDate = 'Invalid or expired expiry date';
    }

    if (cvv.length !== 3) {
      errors.cvv = 'CVV must be 3 digits';
    }

    if (Object.keys(errors).length === 0) {
      console.log('Payment submitted:', { cardNumber, expiryDate, cvv });
      setPaymentSubmitted(true);
      // Optionally, clear cart items in the backend
      axios.delete('http://localhost:3000/api/CartItems')
        .then(response => {
          console.log('Cart items cleared');
        })
        .catch(error => {
          console.error('Error clearing cart items:', error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment Details</h1>
      {!paymentSubmitted ? (
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              className="payment-input"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              className="payment-input"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
            />
            {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              className="payment-input"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
            />
            {errors.cvv && <div className="error-message">{errors.cvv}</div>}
          </div>
          <button type="submit" className="payment-btn">
            Pay ${totalPrice.toFixed(2)} Now
          </button>
        </form>
      ) : (
        <div className="summary-container">
          <h2 className="summary-title">Payment Summary</h2>
          <p>Card Number: {cardNumber}</p>
          <p>Expiry Date: {expiryDate}</p>
          <p>Total Amount: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
