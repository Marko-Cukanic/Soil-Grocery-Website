import React, {useState, useEffect} from 'react';

function ShoppingItem({ id, name, price, image, discountedPrice, handleAddToCart }){
    const[quantity, setQuantity] = useState(1);

    function handleQuantityChange(e){
        const newAmount = parseInt(e.target.value);
        if(!isNaN(newAmount) && newAmount >= 1){
            setQuantity(newAmount);
          }
          else{
            setQuantity('');
          }
    }

    function handleAddToCartClick(){
        const item = { id, name, price: discountedPrice || price, quantity };
        handleAddToCart(item);
        alert(`Added ${item.quantity} ${item.name}(s) to the cart.`);
        setQuantity(1);
    }

    return(
        <div className="item">
            <img src={process.env.PUBLIC_URL + image} alt={name} />
            <div className="itemInfo">
                <h3>{name}</h3>
                <p className="itemPrice">
                    {discountedPrice ?(
                        <>
                            <span className="originalPrice"><s>${price.toFixed(2)}</s></span>
                            <span className="discountedPrice"> ${discountedPrice.toFixed(2)}</span>
                        </>
                    ) : `$${price.toFixed(2)}`}
                </p>
                <div className="amountAdded">
                    <input type="number" min="1" value={quantity} onChange={handleQuantityChange}/>
                    <button onClick={handleAddToCartClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

function ItemGrid({ items, handleAddToCart }){
    return(
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

export default function WeeklySpecials(){
    const [specialItems, setSpecialItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('storedItems'));
        if(storedItems){
            const randomItems = shuffle(storedItems).slice(0, 5).map(item => {
                const discountedPrice = item.id <= 3 ? item.price * 0.8 : item.price * 0.5;
                return{ ...item, discountedPrice };
            });
            setSpecialItems(randomItems);
        }
    }, []);

    function shuffle(array){
        let currentIndex = array.length, randomIndex;
        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function handleAddToCart(newItem) {
        // Retrieve the current cart items from localStorage
        const currentCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      
        // Check if the item already exists in the cart
        const existingItemIndex = currentCartItems.findIndex(item => item.id === newItem.id);
      
        if (existingItemIndex > -1) {
          // If the item exists, update the quantity
          const updatedCartItems = currentCartItems.map((item, index) => {
            if (index === existingItemIndex) {
              return { ...item, quantity: item.quantity + newItem.quantity };
            }
            return item;
          });
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
          // If the item does not exist, add it to the cart
          const updatedCartItems = [...currentCartItems, newItem];
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
      }

    return(
        <div className="dealsPage">
            <div className="dealsTitle">
                <h1>Weekly Specials</h1>
            </div>
            <ItemGrid items={specialItems} handleAddToCart={handleAddToCart}/>
        </div>
    );
}
