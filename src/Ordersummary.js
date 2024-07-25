import React from "react"; // Ensure import statements are at the top
import "./Ordersummary.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Address from "./Address.js";
import Myorder from "./Myorder.js";

// Combined into a single Ordersummary component
function Ordersummary({
  itemToShow,
  finalAmount,
  userContact = {},
  isAuthenticated,
}) {
  const navigate = useNavigate();

  const handlePayment = async () => {
    const { name, address, contactNumber } = userContact;

    // Check if user is authenticated
    if (!isAuthenticated) {
      alert("Please sign in to proceed with payment");
      navigate("/login");
      return;
    }

    // Check if contact information is filled
    if (!name || !address || !contactNumber) {
      alert("Please enter complete contact details to proceed with payment");
      return;
    }

    // Check if there are items to checkout
    if (itemToShow.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
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
        handler: async function (response) {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          // Handle success or other logic here

          // Save purchase details after successful payment
          try {
            await axios.post("http://localhost:8000/api/purchases/myorder", {
              userId: "exampleUserId", // Replace with actual userId
              items: itemToShow.map((item) => ({
                productId: item.id,
                price: item.price,
              })),
              totalAmount: finalAmount,
            });
            navigate("/myorder");
          } catch (error) {
            console.error("Error saving purchase:", error);
          }
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

  // Ensure only one handleProceedToPayment function
  const handleProceedToPayment = () => {
    navigate("/Paymentuser", { state: { finalAmount } });
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
          <button className="proceed-to" onClick={handleProceedToPayment}>
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ordersummary;
