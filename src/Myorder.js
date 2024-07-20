import React, { useEffect, useState } from "react";
import "./Myorder.css";
import axios from "axios";

function Myorder() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details from backend or local storage
    const fetchOrderDetails = async () => {
      try {
        const userId = "66862893d1ae7e933c7bf59e"; // Replace with dynamic user ID
        const response = await axios.get("http://localhost:8000/api/purchases");
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

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
      </div>
      <hr className="check-line" />

      {orderDetails ? (
        <div>
          <h3>Order ID: {orderDetails.orderId}</h3>
          <p>Total Amount: {orderDetails.totalAmount}</p>
          {/* Add more details as required */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Myorder;
