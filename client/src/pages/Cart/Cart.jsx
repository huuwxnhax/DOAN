import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Cart.css";
import prod1 from "../../assets/images/prod1.webp";
import FooterSection from "../../components/Sections/FooterSection";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product name 1",
      size: "XL",
      color: "Xanh",
      brand: "Gucci",
      price: 50000,
      quantity: 1,
      imageUrl: "path/to/shirt.png", // Update this to your image path
      priceEach: 50000,
    },
    {
      id: 2,
      name: "Product name 2",
      size: "XL",
      color: "Xanh",
      brand: "Gucci",
      price: 70000,
      quantity: 2,
      imageUrl: "path/to/jacket.png", // Update this to your image path
      priceEach: 35000,
    },
    {
      id: 3,
      name: "Product name 3",
      size: "XL",
      color: "Xanh",
      brand: "Tissot",
      price: 500000,
      quantity: 4,
      imageUrl: "path/to/shorts.png", // Update this to your image path
      priceEach: 100000,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta), // Ensure quantity doesn't go below 1
              price: item.priceEach * Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleOpenModal = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemToDelete)
    );
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="shopping-cart">
      <Navbar />
      <div className="cart-content">
        <h2>Giỏ hàng của bạn</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="item-cart">
              <div className="product-info">
                <img src={prod1} alt="abc" />
                <div className="detail">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Màu: {item.color}</p>
                  <p>Brand: {item.brand}</p>
                </div>
              </div>
              <div className="product-quantity">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="subtraction"
                >
                  -
                </button>
                <input type="text" value={item.quantity} readOnly />
                <button
                  onClick={() => handleQuantityChange(item.id, +1)}
                  className="addition"
                >
                  +
                </button>
              </div>
              <div className="product-price">
                <p>Giá: {item.priceEach}đ</p>
                <p>Tổng: {item.price}đ</p>
              </div>
              <div className="product-action">
                <button
                  onClick={() => handleOpenModal(item.id)}
                  className="btn-delete"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-actions">
          <button className="continue-shopping">Tiếp Tục Shopping</button>
          <button className="make-purchase">Thanh Toán</button>
        </div>
      </div>
      <div className="cart-footer">
        <FooterSection />
      </div>
      {showModal && (
        <ConfirmationModal
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Cart;
