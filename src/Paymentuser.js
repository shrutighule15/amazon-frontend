import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Myorder from "./Myorder";

function Paymentuser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { finalAmount } = location.state || {};
  const [{ cart, user }] = useStateValue(); // Correcting the hook usage

  if (!finalAmount) {
    // Navigate back to checkout if finalAmount is not available
    navigate("/checkout");
    return null; // Prevent rendering the rest of the component
  }

  const handlePayment = async () => {
    // Log the finalAmount in rupees
    console.log("Final Amount in Rupees:", finalAmount);
    try {
      const orderUrl = "http://localhost:8000/api/payment/order";
      const { data } = await axios.post(orderUrl, {
        amount: finalAmount * 100,
        currency: "INR",
        receipt: "receipt#1",
      });

      // Log the response from the backend
      console.log("Razorpay API Response:", data);

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

          // Save purchase details to MongoDB
          try {
            let userDetails = localStorage.getItem("user");
            if (!userDetails) {
              alert("Please sign in to proceed with payment");
              navigate("/login");
              return;
            }
            userDetails = JSON.parse(userDetails)
            const userId = userDetails.user_id;
            const savePurchaseUrl = "http://localhost:8000/api/purchases/save";
            const purchasePayload = {
              userId: userId, // Replace with the correct user ID from your state
              items: cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
              })),
              totalAmount: finalAmount,
              purchaseDate: new Date(),
            };

            console.log(
              "Payload to be sent to savePurchaseUrl:",
              purchasePayload
            );

            const purchaseResponse = await axios.post(
              savePurchaseUrl,
              purchasePayload
            );
            // Navigate to a success page
            navigate("/Myorder");
          } catch (error) {
            console.error("Error saving purchase details:", error);
            alert("Error saving purchase details");
            // Handle error gracefully (e.g., show a message to the user)
          }
        },
        prefill: {
          name: user?.name || "Shruti", // Replace with user name
          email: user?.email || "shrughule15@gmail.com", // Replace with user email
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
      alert("Payment failed");
      // Handle error gracefully (e.g., show a message to the user)
    }
  };
  return (
    <div>
      <h1>Complete Your Payment</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Paymentuser;
