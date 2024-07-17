import React from "react";
import "./Ordersummary.css";
import { Link } from "react-router-dom";
function ordersummary({ itemToShow, finalAmount }) {
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
        <Link to="/Paymentuser">
          <button className="proceed-to">Proceed to payment</button>
        </Link>
      </div>
    </div>
  );
}

export default ordersummary;
