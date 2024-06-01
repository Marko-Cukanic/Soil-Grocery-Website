import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../products.css';

function ShoppingItem({ id, name, price, specialPrice, image, handleAddToCart }) {
  const formattedPrice = !isNaN(price) ? Number(price).toFixed(2) : 'N/A';
  const formattedSpecialPrice = specialPrice && !isNaN(specialPrice) ? Number(specialPrice).toFixed(2) : null;
  const [quantity, setQuantity] = useState(1);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: '', stars: 0 });

  useEffect(() => {
    if (showReviews) {
      axios.get(`http://localhost:3000/api/reviews/product/${id}`)
        .then(response => {
          setReviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [id, showReviews]);

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
    alert(`Added ${item.quantity} ${item.name}(s) to the cart.`);
    handleAddToCart(item);
    setQuantity(1);
  }

  function handleReviewChange(e) {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    const user_id = localStorage.getItem('id');
    if (!user_id) {
      alert('You need to log in to submit a review');
      return;
    }
    axios.post(`http://localhost:3000/api/reviews/product/${id}`, {
      user_id: user_id,
      text: newReview.text,
      stars: newReview.stars
    })
    .then(response => {
      setReviews(prev => [...prev, response.data]);
      setNewReview({ text: '', stars: 0 });
      setShowAddReview(false);
    })
    .catch(error => {
      console.error('Error submitting review:', error);
    });
  }

  return (
    <div className="item">
      <img src={process.env.PUBLIC_URL + image} alt={name} className="product-image" />
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
        <div className="buttons-container">
          <button onClick={() => setShowAddReview(!showAddReview)}>Add a Review</button>
          <button onClick={() => setShowReviews(!showReviews)}>View Reviews</button>
        </div>
        {showAddReview && (
          <form onSubmit={handleReviewSubmit} className="review-form">
            <textarea
              name="text"
              value={newReview.text}
              onChange={handleReviewChange}
              placeholder="Write a review"
              required
            />
            <select name="stars" value={newReview.stars} onChange={handleReviewChange} required>
              <option value="" disabled>Rate the product</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
            <button type="submit">Submit Review</button>
          </form>
        )}
        {showReviews && (
          <div className="reviews">
            <h4>Reviews</h4>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="review">
                  <p>{review.text}</p>
                  <p>Rating: {review.stars} stars</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
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
    const user_id = localStorage.getItem('id');
    if (!item || !item.id) {
      console.error('Invalid item or missing ID:', item);
      return;
    }

    axios.post('http://localhost:3000/api/CartItems', {
      user_id: user_id,
      product_id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.specialPrice || item.price,
      totalPrice: (item.specialPrice || item.price) * item.quantity
    })
    .then(response => {
      console.log('Added to cart:', response.data);
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
    });
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
