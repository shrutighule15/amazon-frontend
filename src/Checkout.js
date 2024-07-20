import React, { useState } from "react";
import Ordersummary from "./Ordersummary.js";
import Address from "./Address.js";
import "./Checkout.css";
import { useStateValue } from "./StateProvider.js";

function Checkout({ hideHeaderAndSubtotal }) {
  const [{ selectedItems, cart, user }] = useStateValue();

  // Filter cart items based on selectedItems
  const itemsToShow = cart.filter((item) => selectedItems.includes(item.id));
  const finalAmount = itemsToShow.reduce(
    (final, item) => final + item.price * item.quantity,
    0
  );

  // Ensure user is an object before accessing its properties
  const userContact = {
    name: user?.name || "",
    address: user?.address || "",
    contactNumber: user?.contactNumber || "",
  };

  // State to manage user contact information
  const [contactInfo, setContactInfo] = useState(userContact);

  // Update contact information
  const handleContactUpdate = (updatedContactInfo) => {
    setContactInfo(updatedContactInfo);
  };

  // Example of checking if user is authenticated
  const isAuthenticated = Boolean(user);

  return (
    <div className="checkout-container">
      <div className="logo-container">
        <img
          className="checkout-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </div>
      <div className="checkout-content">
        <div className="check-heading-container">
          <div className="check-heading">
            <h2>Checkout ({itemsToShow.length} items)</h2>
          </div>
          <hr className="check-line"></hr>

          <div className="checkout-items">
            {itemsToShow.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className="checkout-rating">
                    {Array(item.rating)
                      .fill()
                      .map((_, i) => (
                        <p key={i}>⭐</p>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Ordersummary
        itemToShow={itemsToShow}
        finalAmount={finalAmount}
        userContact={contactInfo}
        isAuthenticated={isAuthenticated}
      />
      <Address
        userContact={contactInfo}
        isAuthenticated={isAuthenticated}
        onUpdate={handleContactUpdate}
      />
    </div>
  );
}

export default Checkout;
