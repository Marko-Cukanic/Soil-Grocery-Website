import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeeklySpecials() {
    const [specialItems, setSpecialItems] = useState([]);

    useEffect(() => {
        const fetchSpecials = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/weekly_specials');
                console.log('Weekly specials fetched:', response.data);
                setSpecialItems(response.data);
            } catch (error) {
                console.error('Error fetching weekly specials:', error);
            }
        };

        fetchSpecials();
    }, []);

    function handleAddToCart(newItem) {
        console.log(`Adding ${newItem.quantity} of ${newItem.name} to the cart.`);
        axios.post('http://localhost:3000/api/CartItems', {
            user_id: 1, // Replace with actual user_id if available
            product_id: newItem.id,
            name: newItem.name,
            quantity: newItem.quantity,
            price: newItem.price,
            totalPrice: newItem.quantity * newItem.price
        })
        .then(response => {
            console.log('Added to cart:', response.data);
            alert(`Added ${newItem.quantity} ${newItem.name}(s) to the cart.`);
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
        });
    }

    return (
        <div className="dealsPage">
            <div className="dealsTitle">
                <h1>Weekly Specials</h1>
            </div>
            <ItemGrid items={specialItems} handleAddToCart={handleAddToCart} />
        </div>
    );
}

function ItemGrid({ items, handleAddToCart }) {
    return (
        <div className="grid-container">
            {items.map(item => (
                <ShoppingItem
                    key={item.productId}
                    id={item.productId}
                    name={item.name}
                    price={item.originalPrice}
                    discountedPrice={item.discountedPrice}
                    image={item.image}
                    handleAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
}

function ShoppingItem({ id, name, price, image, discountedPrice, handleAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        console.log('ShoppingItem props:', { id, name, price, image, discountedPrice });
    }, [id, name, price, image, discountedPrice]);

    function handleQuantityChange(e) {
        const newAmount = parseInt(e.target.value);
        if (!isNaN(newAmount) && newAmount >= 1) {
            setQuantity(newAmount);
        } else {
            setQuantity('');
        }
    }

    function handleAddToCartClick() {
        const item = { id, name, price: discountedPrice || price, quantity };
        handleAddToCart(item);
        setQuantity(1);
    }

    const displayPrice = (price) => {
        console.log('Display price called with:', price);
        return typeof price === 'number' ? price.toFixed(2) : 'N/A';
    };

    return (
        <div className="item">
            <img src={process.env.PUBLIC_URL + image} alt={name} />
            <div className="itemInfo">
                <h3>{name}</h3>
                <p className="itemPrice">
                    {discountedPrice !== undefined ? (
                        <>
                            <span className="originalPrice"><s>${displayPrice(price)}</s></span>
                            <span className="discountedPrice red-text">${displayPrice(discountedPrice)}</span>
                        </>
                    ) : `$${displayPrice(price)}`}
                </p>
                <div className="amountAdded">
                    <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                    <button onClick={handleAddToCartClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
