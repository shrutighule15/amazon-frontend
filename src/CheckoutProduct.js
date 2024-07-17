import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

function CheckoutProduct({ id, image, title, price, rating, quantity }) {
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    //remove the item from the cart
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: id,
    });
  };

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct-image' src={image} alt='' />
      <div className='checkout-item-details'>
        <div className='checkoutProduct-info'>
          <p className='checkoutProduct-title'>{title}</p>
          <div className='checkoutProduct-price'>
            <small>₹</small>
            <strong>{price}</strong>
          </div>

          <div className='checkoutProduct-rating'>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
          <div className="checkoutProduct__quantity">
            Quantity: <strong>{quantity}</strong>
          </div>
          <button className='remove-cart' onClick={removeFromCart}>Remove from cart</button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
