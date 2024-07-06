import React, { useState } from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getCartTotal } from './reducer'
import { Link, useNavigate } from 'react-router-dom'

function Subtotal({selectedItems}) {
  const [{cart}, dispatch] = useStateValue();
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

  return (
    <div className='subtotal-container'>
    <div className='subtotal'>
      <CurrencyFormat
      renderText={(value) => (
<>
<p className='sub'>
  Subtotal ({cart.length}item): <strong>{value}</strong>
</p>
<small className='gift'>
  <input type='checkbox'/>  This order contains a gift</small>
</>
      )}  
      decimalScale={2}
      value={getCartTotal(cart)}
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
