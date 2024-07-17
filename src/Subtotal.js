import React, { useState } from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getCartTotal } from './reducer'
import { Link, useNavigate } from 'react-router-dom'

function Subtotal({ selectedItems }) {
  const [{ cart }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const proceedToCheckout = () => {
    const itemsToCheckout = cart.filter(item => selectedItems.includes(item.id));
    dispatch(
      {
        type: 'SET_SELECTED_ITEMS',
        items: selectedItems
      })
    navigate('/Checkout')
  }

  const getSelectedCartItems = () => {
    return cart.filter(item => selectedItems.includes(item.id));
  };

  const calculateTotal = () => {
    const selectedCartItems = getSelectedCartItems();
    return selectedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className='subtotal-container'>
      <div className='subtotal'>
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p className='sub'>
                Subtotal ({selectedItems.length} items): <strong>{value}</strong>
              </p>
              <small className='gift'>
                <input type='checkbox' style={{ marginRight: "5px" }} />  This order contains a gift
              </small>
            </>
          )}
          decimalScale={2}
          value={calculateTotal()}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₹'}
        />

        <button className='proceed' onClick={proceedToCheckout}>
          Proceed to checkout
        </button>

      </div>
    </div>
  )
}

export default Subtotal
