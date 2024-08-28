import React from "react";
import { useState } from "react";
import "./PurchaseModal.css";
import product1 from "../../assets/images/product1.webp";

const PurchaseModal = ({ isOpen, onClose, product }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!isOpen) return null;

  const handleApplyDiscount = () => {
    // Handle the discount code application logic here
    console.log("Applying discount code:", discountCode);
  };

  const handleViewDiscounts = () => {
    // Handle the logic to view available discounts
    console.log("Viewing available discounts");
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Xác Nhận Mua Hàng</h2>
        <div className="product-info">
          <img src={product1} alt="Product" />
          <div className="purchase-detail">
            <p className="purchase-name">
              Khô gà lá chanh Cobi Food hộp 300g xé giòn, đậm vị, cay vừa, đồ ăn
              vặt không chứa phẩm màu vặt không chứa phẩm màu
            </p>
            <div className="purchase-price">
              <span className="text-secondary price-promotional">45.000đ</span>
              <span className="text-primary price-original">50.000đ</span>
              <div className="purchase-size">
                <span> Túi 300g</span>
              </div>
              <div className="purchase-brand">
                <a href="#">Cobi Food</a>
              </div>
            </div>
          </div>
        </div>
        <div className="purchase-quantity">
          <div className="detail-quantity">
            <span>Số lượng: </span>
            <div className="product-quantity">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="subtraction"
              >
                -
              </button>
              <input type="text" value={quantity} readOnly />
              <button
                onClick={() => handleQuantityChange(+1)}
                className="addition"
              >
                +
              </button>
            </div>
          </div>
          <span>2</span>
          <span>Tổng: 100.000đ</span>
        </div>
        <div className="detail-purchase">
          <div className="ship-address">
            <span>Địa chỉ giao hàng:</span>
            <p>123 Nguyen Van Linh, Da Nang 123 Nguyen Van Linh, Da Nang</p>
          </div>
          <div className="ship-price">
            <span>Tiền vận chuyển</span>
            <span>20.000đ</span>
          </div>
          <div className="discount">
            <span>Giảm giá:</span>
            <span>0đ</span>
          </div>
          <div className="discount-code">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={handleApplyDiscount}>Áp dụng</button>
          </div>
          <div className="view-discounts" onClick={handleViewDiscounts}>
            Xem mã giảm giá đang có
          </div>
          <div className="total-price">
            <span>Tổng cộng:</span>
            <span>120.000đ</span>
          </div>
          <div className="payment-method">
            <span>Phương thức thanh toán:</span>
            <div className="payment-options">
              <button
                className={`payment-option ${
                  paymentMethod === "cash" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                Thanh toán khi nhận hàng
              </button>

              <button
                className={`payment-option ${
                  paymentMethod === "zalo" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("zalo")}
              >
                Zalo Pay
              </button>
            </div>
          </div>
        </div>
        {/* Add more product details as needed */}

        <div className="modal-actions">
          <button onClick={onClose} className="close-btn">
            Huỷ
          </button>
          <button
            onClick={() => {
              /* Add purchase functionality here */
            }}
            className="purchase-btn"
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
