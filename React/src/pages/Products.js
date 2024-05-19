import React, {useState, useEffect, useMemo} from 'react';

function ShoppingItem({id, name, price, specialPrice, image, handleAddToCart}){
    const formattedPrice = price.toFixed(2);
    const [quantity, setQuantity] = useState(1);

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
    const item = { id, name, price, specialPrice, quantity };
    console.log('Item to be added to cart:', item);
    alert(`Added ${item.quantity} ${item.name}(s) to the cart.`);
    handleAddToCart(item);
    setQuantity(1);
  }

  return(
      <div className="item">
          <img src={process.env.PUBLIC_URL + image} alt={name}/>
          <div className="itemInfo">
              <h3>{name}</h3>
              <p className="itemPrice">
                {specialPrice && specialPrice < price ?(
                  <>
                    <del>${formattedPrice}</del> ${specialPrice.toFixed(2)}
                  </>
                ):(`$${formattedPrice}`)}
              </p>
              <div className="amountAdded">
                  <input type="number" min="1" value={quantity} onChange={handleQuantityChange}/>
                  <button onClick={handleAddToCartClick}>Add to Cart</button>
              </div>
          </div>
      </div>
  );
}

function ItemGrid({items, handleAddToCart}){
  return(
      <div className="grid-container">
          {items.map(item => (
              <ShoppingItem key={item.id} id={item.id} name={item.name} price={item.price} specialPrice={item.specialPrice} image={item.image} handleAddToCart={handleAddToCart}/>
          ))}
      </div>
  );
}

export default function Products(){
    const items = useMemo(() => [
      { id: 1, name: 'Apple', price: 2.19, image: 'apple.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Fapple&psig=AOvVaw2Pu4_TWbmdhpQwcWb2TmN8&ust=1713345399779000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDXlfKzxoUDFQAAAAAdAAAAABAE
      { id: 2, name: 'Banana', price: 1.29, image: 'banana.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreepng.pictures%2Fdownload%2Fbanana-11%2F&psig=AOvVaw0x4y6uPAQg3JaH5n67L_El&ust=1713345505353000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMi2nvCzxoUDFQAAAAAdAAAAABAE
      { id: 3, name: 'Orange', price: 1.29, image: 'orange.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngfre.com%2Forange-png%2F&psig=AOvVaw3MdsrjSFyo0-JpSMyYggho&ust=1713345550100000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDGjdmzxoUDFQAAAAAdAAAAABAI
      { id: 4, name: 'Pear', price: 2.49, image: 'pear.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fpear-fruit-diet_6343111.html&psig=AOvVaw2pHeYWQwmGxUwgN3L88TxW&ust=1713345640137000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCND5poa0xoUDFQAAAAAdAAAAABAi
      { id: 5, name: 'Watermelon', price: 10.49, image: 'watermelon.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fpnghunter.com%2Fpng%2Fwatermelon-3%2F&psig=AOvVaw22O91tcl1XEa6Jq4E_D7ea&ust=1713345800982000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLiZu9C0xoUDFQAAAAAdAAAAABA6
      { id: 6, name: 'Box of Cherries', price: 22.39, image: 'cherries.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fwatercolor-fresh-and-delicious-cherry-fruit-box-free-elements_14064596.html&psig=AOvVaw3X2vMdxqNtb858NKKJVcuI&ust=1713345959094000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKitzqC1xoUDFQAAAAAdAAAAABAR
      { id: 7, name: 'Box of Blueberries', price: 7.49, image: 'blueberries.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapers.com%2Fpng%2Ffresh-blueberriesin-plastic-container-x5xspxu7miq62hbq.html&psig=AOvVaw3R2IAbJ4x1b3IPC9pOWDYK&ust=1713346024550000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCSx7u1xoUDFQAAAAAdAAAAABAI
      { id: 8, name: 'Box of Raspberries', price: 7.49, image: 'raspberries.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fpng%2F26973943-raspberries-in-a-box-ripe-and-juicy-raspeberries-raspberry&psig=AOvVaw0WbbETIqWpY09Xq2Lo9nJW&ust=1713346059060000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCAtMy1xoUDFQAAAAAdAAAAABAE
      { id: 9, name: 'Tomato', price: 2.29, image: 'tomato.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2Ffresh-red-tomato-png-image--675610381577497272%2F&psig=AOvVaw0mbW2zMY0iDLk0lkznAo2L&ust=1713346082851000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjF0te1xoUDFQAAAAAdAAAAABAE
      { id: 10, name: 'Potato', price: 1.99, image: 'potato.png' }, //https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngimg.com%2Fimage%2F7078&psig=AOvVaw1liEA6Xt-vTRFTwC7ArUj-&ust=1713346110678000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOiurum1xoUDFQAAAAAdAAAAABAE
    ], []);

    useEffect(() => {
      const storedItems = JSON.parse(localStorage.getItem('storedItems'));
      if(!storedItems){
        localStorage.setItem('storedItems', JSON.stringify(items));
      }
  }, [items]);

  function handleAddToCart(item){
    if(!item || !item.id){
        console.error('Invalid item or missing ID:', item);
        return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if(!Array.isArray(cartItems)){
        cartItems = [];
    }

    cartItems = cartItems.filter(cartItem => cartItem && cartItem.id);

    console.log('Existing cart items:', cartItems);

    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    console.log('Existing item index:', existingItemIndex);

    if(existingItemIndex !== -1){
      cartItems[existingItemIndex].quantity += item.quantity;
    }
    else{
      cartItems.push({ ...item, quantity: item.quantity, price: item.specialPrice || item.price });
    }

    console.log('Updated cart items:', cartItems);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Added', item.quantity, item.name, 'to cart');
}

  return(
      <div className="dealsPage">
          <div className="dealsTitle">
              <h1>Organic Produce</h1>
          </div>
          <ItemGrid items={items} handleAddToCart={handleAddToCart} />
      </div>
  );
}



      