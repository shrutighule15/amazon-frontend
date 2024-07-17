import React from "react";
import "./Ordersummary.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Ordersummary({
  itemToShow,
  finalAmount,
  userContact = {},
  isAuthenticated,
}) {
  const navigate = useNavigate();

  const handlePayment = async () => {
    const { name, address, contactNumber } = userContact;

    if (!isAuthenticated) {
      alert("Please sign in to proceed with payment");
      navigate("/login"); // Redirect to login page or handle as needed
      return;
    }

    if (!name || !address || !contactNumber) {
      alert("Enter contact details to proceed with payment");
      return;
    }

    try {
      const orderUrl = "http://localhost:8000/api/payment/order";
      const { data } = await axios.post(orderUrl, {
        amount: finalAmount * 100, // Amount in paise (Razorpay requires the amount in the smallest unit of currency)
        currency: "INR",
        receipt: "receipt#1",
      });

      const options = {
        key: "rzp_test_VKPcc2S3lu6ehh", // Replace with your Razorpay test key
        amount: data.amount,
        currency: data.currency,
        name: "Amazon Clone",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          // Handle success or other logic here
        },
        prefill: {
          name: "Shruti",
          email: "shruti15@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Mumbai",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error in payment:", error);
      // Handle error gracefully (e.g., show a message to the user)
    }
  };

  return (
    <div className="summary-container">
      <div className="summary">
        <h2 className="order-heading">Order Summary</h2>

        <div className="item">
          <span className="item-count">({itemToShow.length} items):</span>
          <span className="item-total">₹ {finalAmount}</span>
        </div>
        <hr className="order-line"></hr>

        <div className="order-total">
          <h3 className="total-heading">Order Total</h3>
          <span className="final-amount">₹ {finalAmount}</span>
        </div>
        <div>
          <button className="proceed-to" onClick={handlePayment}>
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ordersummary;
