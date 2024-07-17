import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({ id, image, title, price, rating }) {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    // Dispatch the item into the data layer
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: id, 
        image: image,
        title: title,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className='Product'>
      <img className='img-pro' src={image} alt='' />
      <div className='product-info'>
        <p>{title}</p>
        <p className='product-price'>
          <small>₹{price}</small>
        </p>
        <div className='product-rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>
        <button className='add-cart' onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
