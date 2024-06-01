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
  const [newReview, setNewReview] = useState({ text: '', stars: 1 });

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
      stars: parseInt(newReview.stars) || 1 // Default to 1 if invalid
    })
    .then(response => {
      setReviews(prev => [...prev, response.data]);
      setNewReview({ text: '', stars: 1 });
      setShowAddReview(false);
    })
    .catch(error => {
      console.error('Error submitting review:', error);
    });
  }

  function handleEditReview(review) {
    // Logic to handle review editing
    // You can open a modal or toggle a form to edit the review
  }

  function handleDeleteReview(reviewId) {
    axios.delete(`http://localhost:3000/api/reviews/${reviewId}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== reviewId));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
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
        <div className="review-buttons">
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
            <button type="submit" className="submit-review-button">Submit Review</button>
          </form>
        )}
        {showReviews && (
          <div className="reviews">
            <h4>REVIEWS</h4>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="review review-separator">                  <strong>{review.User ? review.User.name : 'Anonymous'}</strong>
                  <p>{review.text}</p>
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} className={index < review.stars ? 'filled' : 'unfilled'}>★</span>
                    ))}
                  </div>
                  {localStorage.getItem('id') === review.user_id.toString() && (
                    <div className="review-actions">
                      <button onClick={() => handleEditReview(review)}>Edit</button>
                      <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                    </div>
                  )}
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
