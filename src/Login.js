import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import e from 'cors';
import axios from 'axios';
import './Home'
import { useStateValue } from './StateProvider';

function Login() {
const [email, setEmail]= useState('')
const[password, setPassword]= useState('')
const [error, setError] = useState('');
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/users/login', {
      email,
      password
    });
    console.log(response.data); // Assuming the response contains user data
      // Dispatch user information to the global state
      
      dispatch({
        type: 'SET_USER',
        user: response.data,
      });
      
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className='login'>
      <div>
      <Link to = '/' className='logo-link'>
      <img className='login-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=''></img>
      </Link>
    
<div className='login-box'>
<h1 className='login-heading'>Sign in</h1>
<form onSubmit={handleSubmit}/>
<div>
<span className='mail'>Email</span>
<input type='text' className='mail-password' placeholder='Enter Email'
onChange={(e)=> setEmail(e.target.value)}
/>
</div>

<div>
<span className='password'>Password</span>
<input type='password' className='mail-password' placeholder='Enter Password'
onChange={(e) => setPassword(e.target.value)}
/>

<button className='continue' onClick={handleSubmit}>Sign in</button>
<p className='terms-login'>By continuing, you agree to Amazon's Clone Conditions of Use and Privacy Notice.</p>

<div className='line-container'>
<hr className='line'></hr>
<span className='line text'>New to Amazon?</span>
<hr className='line'></hr>
</div>

<Link to= '/Signup'>
<button className='create-account'>Create your Amazon account</button>
</Link>
</div>
    </div>
    </div>
    </div> 
  )
}

export default Login;
