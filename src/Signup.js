import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login'

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/users/signup', { name, email, password })
      .then(result => {
        Navigate('/login')
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='sign'>
      <div>
        <Link to='/'>
          <img className='sign-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=''></img>
        </Link>
      </div>

      <div className='sign-box'>
        <h1 className='signup-heading'>Create account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <span className='name'>Name</span>
            <input
              type='text'
              id='name'
              name='name'
              className='details'
              placeholder='Enter Name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <span className='email'>Email</span>
            <input
              type='text'
              id='email'
              name='email'
              className='details'
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <span className='password'>Password</span>
            <input
              type='password'
              id='password'
              name='password'
              className='details'
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className='continue'>Register</button>
        </form>
        <p className='terms-sign'>By creating an account, you agree to Amazon's Clone Conditions of Use and Privacy Notice.</p>
        <hr className='line2'></hr>
        <span className='already'>Already have an account?</span>

        <Link to='/Login'>
          <span className='signin'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup;