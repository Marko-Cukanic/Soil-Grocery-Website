import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeeklySpecials() {
    const [specialItems, setSpecialItems] = useState([]);

    useEffect(() => {
        const fetchSpecials = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/weekly_specials'); // Ensure this URL is correct
                setSpecialItems(response.data);
            } catch (error) {
                console.error('Error fetching weekly specials:', error);
            }
        };

        fetchSpecials();
    }, []);

    function handleAddToCart(newItem) {
        console.log(`Adding ${newItem.quantity} of ${newItem.name} to the cart.`);
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

function ShoppingItem({ id, name, price, image, discountedPrice, handleAddToCart }) {
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
        const item = { id, name, price: discountedPrice || price, quantity };
        handleAddToCart(item);
        alert(`Added ${item.quantity} ${item.name}(s) to the cart.`);
        setQuantity(1);
    }

    const displayPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : 'N/A';
    };

    return (
        <div className="item">
            <img src={process.env.PUBLIC_URL + image} alt={name} />
            <div className="itemInfo">
                <h3>{name}</h3>
                <p className="itemPrice">
                    {discountedPrice ? (
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

function ItemGrid({ items, handleAddToCart }) {
    return (
        <div className="grid-container">
            {items.map(item => (
                <ShoppingItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    image={item.image}
                    handleAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
}
