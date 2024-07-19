import React, { useEffect, useReducer } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Shoppingcart from "./Shoppingcart";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { motion } from "framer-motion";

// Components
import Header from "./Header.js";
import Home from "./Home.js";
import Login from "./Login";
import Signup from "./Signup";
import Checkout from "./Checkout";
import NotFound from "./components/NotFound";
import Paymentuser from "./Paymentuser.js";
import Myorder from "./Myorder.js";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedUser) {
      dispatch({
        type: "SET_USER",
        user: storedUser,
      });
    }
    dispatch({
      type: "SET_CART",
      cart: storedCart,
    });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);
  return (
    <Router>
      <div className="App"></div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shoppingcart" element={<Shoppingcart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="paymentuser" element={<Paymentuser />} />
        <Route path="myorder" element={<Myorder />} />

        <Route component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
