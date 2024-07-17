import React, { useState } from 'react';
import './Shoppingcart.css';
import Subtotal from './Subtotal.js';
import { useStateValue } from './StateProvider.js';
import CheckoutProduct from './CheckoutProduct.js';
import { useNavigate } from 'react-router-dom';

function Shoppingcart({ hideHeaderAndSubtotal }) {
  const [{ cart }, dispatch] = useStateValue();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate()

  const getItemQuantity = (item) => {
    const foundItem = cart.find(cartItem => cartItem.id === item.id);
    return foundItem ? foundItem.quantity : 1;
  };

  // Handle checkbox change
  const handleCheckboxChange = (item) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(item.id)) {
        return prevSelectedItems.filter(i => i !== item.id); // Remove item if already selected
      } else {
        return [...prevSelectedItems, item.id]; // Add item if not selected
      }
    })
  }
  const proceedToCheckout = () => {
    dispatch({
      type: 'SET_SELECTED_ITEMS',
      items: selectedItems
    });
    navigate('/checkout');
  };

  return (
    <div className="shoppingcart-container">
      <div className={`shoppingcart ${hideHeaderAndSubtotal ? 'hide-header' : ''}`}>
        {!hideHeaderAndSubtotal && (
          <div className='cart-title'>
            <h1>Shopping Cart</h1>
            <hr className='cart-title-line' />
          </div>
        )}
        <div className='cart-content'>
          {cart.map((item) => (
            <div key={item.id} className='cart-item'>
              <input
                type="checkbox"
                className="product-checkbox"
                onChange={() => handleCheckboxChange(item)}
                checked={selectedItems.includes(item.id)}
              />
              <CheckoutProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
                quantity={getItemQuantity(item)}
              />
            </div>
          ))}
        </div>
      </div>
      {!hideHeaderAndSubtotal && (
        <div className="subtotal-container">
          <Subtotal selectedItems={selectedItems} />
        </div>
      )}
    </div>
  );
}

export default Shoppingcart;
