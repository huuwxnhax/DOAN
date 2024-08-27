import React from "react";
import "./PurchaseModal.css";

const PurchaseModal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        {/* Add more product details as needed */}

        <div className="modal-actions">
          <button onClick={onClose} className="close-btn">
            Close
          </button>
          <button
            onClick={() => {
              /* Add purchase functionality here */
            }}
            className="purchase-btn"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
