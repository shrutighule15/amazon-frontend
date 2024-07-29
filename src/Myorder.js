import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Myorder.css";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import "./App.css";

function Myorder() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [{ user }] = useStateValue(); // Get user from state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order details from backend or local storage
    const fetchOrderDetails = async () => {
      if (!user) {
        alert("Please sign in to check your order details");
        navigate("/login");
        return;
      }
      try {
        const userId = user.user_id; // Replace with dynamic user ID
        const response = await axios.get(
          `http://localhost:8000/api/purchases/${userId}`
        );
        console.log("Order Details:", response.data); // Debugging statement
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [user, navigate]);

  return (
    <div className="my-container">
      <div className="my-header">
        <img
          className="my-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </div>
      <div className="my-content">
        <div className="check-heading">
          <h2>Your Orders</h2>
        </div>
        <hr className="check-line" />
        {orderDetails.length > 0 ? (
          orderDetails.map((order, index) => (
            <div key={index} className="order-box">
              <img
                src={order.image}
                alt={order.title}
                className="order-image"
              />
              <div className="order-info">
                <h2 className="order-title">{order.title}</h2>
                <h1 className="order-id">Order ID: {order._id}</h1>
                <p className="total">Total Amount: {order.totalAmount}</p>
                {/* Add more details as required */}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Myorder;
