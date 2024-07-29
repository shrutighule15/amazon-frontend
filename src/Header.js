import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Myorder from "./Myorder";
import "./App.css";

function Header() {
  const [{ cart, user }, dispatch] = useStateValue();

  useEffect(() => {
    // Load cart from localStorage if available and user is signed in
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (user && storedCart) {
      dispatch({
        type: "SET_CART",
        cart: storedCart,
      });
    }
  }, [dispatch, user]);

  const handleSignOut = () => {
    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Clear user and cart from state
    dispatch({
      type: "CLEAR_USER",
    });
    dispatch({
      type: "CLEAR_CART",
    });

    // Clear user from localStorage
    localStorage.removeItem("user");
  };

  const getFirstName = (fullName) => {
    if (fullName) {
      const firstName = fullName.split(" ")[0];
      return firstName;
    }
    return "Guest";
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon logo"
        />
      </Link>

      <div className="search-box">
        <input className="search-in" type="text" placeholder="Search" />
        <SearchIcon className="search-icon" />
      </div>

      <div className="header-nav" onClick={user ? handleSignOut : null}>
        <Link to={!user && "/Login"}>
          <div className="header-option">
            <span className="header-nav-one">
              Hello, {user ? getFirstName(user.name) : "Guest"}
            </span>
            <span className="header-nav-two">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
      </div>

      <div className="header-nav">
        <Link to={"/Myorder"}>
          <div className="header-option">
            <span className="header-nav-one">Returns</span>
            <span className="header-nav-two">& Orders</span>
          </div>
        </Link>
      </div>

      <div className="header-nav-cart">
        <span className="header-nav-one">{cart?.length}</span>

        <Link to="/Shoppingcart">
          <div className="shoping-cart">
            <ShoppingCartIcon />
            <span className="header-nav-two">Cart</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
