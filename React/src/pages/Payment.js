import React, {useState, useEffect} from 'react';

export default function Payment(){
  // State variables for card details and errors
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});

    // State variables for total price and payment submission status
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentSubmitted, setPaymentSubmitted] = useState(false);
    
    useEffect(() => {   // Effect to retrieve total price from local storage when component mounts
        const storedTotalPrice = localStorage.getItem('totalPrice');
        if(storedTotalPrice){
          setTotalPrice(parseFloat(storedTotalPrice));
        }
      }, []);

    
    const handleCardNumberChange = (e) => {
      // Format expiry date as MM/YY
      const input = e.target.value.replace(/\D/g, '');
      setCardNumber(input);
    };
  
    const handleExpiryDateChange = (e) => {
      let input = e.target.value.replace(/\D/g, '');
      const monthYearFormat = /^(0[1-9]|1[0-2])\/?([0-9]{0,2})$/;
      const matches = input.match(monthYearFormat);
      if(matches){
        input = `${matches[1]}${matches[2] ? '/' + matches[2] : ''}`;
      }
      setExpiryDate(input);
    };
    
  
    const handleCvvChange = (e) => {
      const input = e.target.value.replace(/\D/g, '');
      setCvv(input);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = {};
      
      if(cardNumber.length !== 16){
        errors.cardNumber = 'Card number must be 16 digits';
      }
    
      if(!/^\d{2}\/\d{2}$/.test(expiryDate)){
        errors.expiryDate = 'Expiry date must be in MM/YY format';
      }
    
      if(cvv.length !== 3){
        errors.cvv = 'CVV must be 3 digits';
      }
    
      if(Object.keys(errors).length === 0){
        console.log('Payment submitted:', { cardNumber, expiryDate, cvv });
        setPaymentSubmitted(true);
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('cartItems');
      }
      else{
        setErrors(errors);
      }
    };

    return(
        <div className="payment-container">
          <h1 className="payment-title">Payment Details</h1>
          {!paymentSubmitted ?(
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input type="text" id="cardNumber" className="payment-input" value={cardNumber} onChange={handleCardNumberChange} placeholder="1234 5678 9012 3456"/>
              {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input type="text" id="expiryDate" className="payment-input" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY"/>
              {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input type="text" id="cvv" className="payment-input" value={cvv} onChange={handleCvvChange} placeholder="123"/>
              {errors.cvv && <div className="error-message">{errors.cvv}</div>}
            </div>
            <button type="submit" className="payment-btn">Pay ${totalPrice.toFixed(2)} Now</button>
          </form>
          ):(
            <div className="summary-container">
              <h2 className="summary-title">Payment Summary</h2>
                <p>Card Number: {cardNumber}</p>
                <p>Expiry Date: {expiryDate}</p>
                <p>Total Amount: ${totalPrice.toFixed(2)}</p>
            </div>
      )}
        </div>
      );
};
