import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';


function Header() {
  const [{ cart, user }] = useStateValue();

  const getFirstName = (fullName) => {
    if (fullName) {
      const firstName = fullName.split(' ')[0];
      return firstName;
    }
    return 'Guest';
  };

  return (
    <div className='header'>
      <Link to='/'>
        <img className='logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon logo' />
      </Link>


      <div className='search-box'>
        <input className='search-in' type='text' placeholder='Search' />
        <SearchIcon className='search-icon' />
      </div>
      <Link to='/Login'>
        <div className='header-nav'>
          <span className='header-nav-one'>
            Hello, {user ? getFirstName(user.name) : 'Guest'}

          </span>
          <span className='header-nav-two'>
            {user ? 'Welcome' : 'Sign In'}
          </span>
        </div>
      </Link>
      <div className='header-nav'>
        <span className='header-nav-two'>
          Returns
        </span>
        <span className='header-nav-two'>
          & Orders
        </span>
      </div>
      <div className='header-nav-cart'>
        <span className='header-nav-one'>
          {cart?.length}
        </span>

        <Link to='/Shoppingcart'>
          <div className='shoping-cart'>
            <ShoppingCartIcon />
            <span className='header-nav-two'>Cart</span>
          </div>
        </Link>
      </div>
    </div>


  )
}

export default Header
