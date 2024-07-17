import React from "react";
import axios from "axios";

function Paymentuser() {
  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8000/api/payment/order";
      const { data } = await axios.post(orderUrl, {
        amount: 500, // Amount in rupees (replace with dynamic amount)
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
          // alert(`Signature: ${response.razorpay_signature}`);
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
    <div>
      <button onClick={handlePayment}>Pay now</button>
    </div>
  );
}

export default Paymentuser;
