import React from "react";
import './App.css';
import Header from './Header.js';
import Home from "./Home.js";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Shoppingcart from './Shoppingcart';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';
import Login from './Login';
import Signup from "./Signup";
import Checkout from './Checkout'


function App() {
  return (
  <Router>
    <div className="App"></div>
    <Header/>

    
    <Routes>

      <Route path="" element={<><Home/></>}></Route>
    <Route path="shoppingcart" element={<><Shoppingcart/></>}></Route>
<Route path="login" element={<><Login/></>}></Route>
<Route path="signup" element={<><Signup/></>}></Route>
<Route path="checkout" element={<><Checkout/></>}></Route>
      </Routes>

    </Router>

   
      
  );
}


export default App;
