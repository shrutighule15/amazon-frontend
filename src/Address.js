import React, { useEffect, useState } from "react";
import "./Address.css";

function Address({ userContact, isAuthenticated }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [editing, setEditing] = useState(false); // State to track if editing mode is active

  useEffect(() => {
    console.log("User Contact Prop Received:", userContact); // Debug log
    setName(userContact.name || "");
    setAddress(userContact.address || "");
    setContactNumber(userContact.contactNumber || "");
  }, [userContact]);

  // Function to handle name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Function to handle address change
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  // Function to handle contact number change
  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  // Function to toggle editing mode
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false); //disable editing mode after saving
  };

  return (
    <div className="heading-container">
      <div className="heading">
        <h2 className="info">Contact Information</h2>

        <div className="name-heading">
          <h4 className="contact">Name</h4>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="editable-input"
            />
          ) : (
            <div className="info-text">{name}</div>
          )}
        </div>

        <div className="address-heading">
          <h4 className="contact">Shipping Address</h4>
          {editing ? (
            <textarea
              value={address}
              onChange={handleAddressChange}
              className="editable-textarea"
            />
          ) : (
            <div className="info-text">{address}</div>
          )}
        </div>

        <div className="contact">
          <h4 className="contact">Contact Number</h4>
          {editing ? (
            <input
              type="text"
              value={contactNumber}
              onChange={handleContactNumberChange}
              className="editable-input"
            />
          ) : (
            <div className="info-text">{contactNumber}</div>
          )}
        </div>

        <button className="edit" onClick={editing ? handleSave : toggleEditing}>
          {editing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default Address;
