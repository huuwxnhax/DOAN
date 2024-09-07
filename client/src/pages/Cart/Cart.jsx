import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Cart.css";
import prod1 from "../../assets/images/prod1.webp";
import FooterSection from "../../components/Sections/FooterSection";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import { useEffect } from "react";
import {
  addToCart,
  deleteCartItem,
  getCartItemByBuyerId,
} from "../../api/cartAPI";
import { useSelector } from "react-redux";
import { getClassifiesByProductId, getProductById } from "../../api/productAPI";
import Notification from "../../components/Notification/Notification";

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]);
  const [selectedClassifies, setSelectedClassifies] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [productData, setProductData] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  // Fetch cart items for the current user
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItemByBuyerId(user._id);
        const processedItems = response.data.products.flatMap((product) =>
          product.items.map((item) => ({
            ...item,
            seller: product.seller,
            numberProduct: item.numberProduct || 1,
            price: item.price,
          }))
        );
        setCartItems(processedItems);
        console.log("Cart items:", processedItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [user._id]);

  // Fetch product data for all product IDs in cartItems
  useEffect(() => {
    const fetchProductData = async () => {
      const productIds = [...new Set(cartItems.map((item) => item.productId))]; // Lấy danh sách productId duy nhất
      const productDataMap = {}; // Dùng để lưu dữ liệu sản phẩm theo productId

      try {
        // Gọi API cho từng productId để lấy thông tin sản phẩm
        await Promise.all(
          productIds.map(async (productId) => {
            const response = await getProductById(productId);
            if (response && response.data && response.data.length > 0) {
              productDataMap[productId] = response.data[0]; // Giả sử API trả về mảng, lấy đối tượng đầu tiên
            }
          })
        );
        setProductData(productDataMap); // Lưu dữ liệu sản phẩm vào state
        console.log("Product data:", productDataMap);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductData();
    }
  }, [cartItems]);

  // Fetch selected classify for each product in cartItems
  useEffect(() => {
    const fetchClassifyData = async () => {
      try {
        const classifyMap = {};
        for (const item of cartItems) {
          if (item.productId && item.classifyId) {
            const response = await getClassifiesByProductId(item.productId);
            const allClassifies = response.data;

            const selectedClassify = allClassifies.find(
              (classify) => classify._id === item.classifyId
            );

            if (selectedClassify) {
              classifyMap[`${item.productId}-${item.classifyId}`] =
                selectedClassify;
            }
          }
        }
        setSelectedClassifies(classifyMap);
      } catch (error) {
        console.log(error);
      }
    };
    if (cartItems.length > 0) {
      fetchClassifyData();
    }
  }, [cartItems]);

  // Xử lý thay đổi số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = async (productId, delta) => {
    const item = cartItems.find((item) => item.productId === productId);
    if (!item) return;

    const newQuantity = item.numberProduct + delta;

    if (newQuantity <= 0) return; // Không cho phép số lượng nhỏ hơn 1

    const cartDTO = {
      buyer: user._id,
      productId: item.productId,
      classifyId: item.classifyId,
      seller: item.seller,
      numberProduct: 1, // chỉ thêm/bớt 1 sản phẩm mỗi lần
    };

    try {
      let response;
      if (delta > 0) {
        // Tăng số lượng sản phẩm
        response = await addToCart(cartDTO);
      } else {
        // Giảm số lượng sản phẩm
        response = await deleteCartItem(cartDTO);
      }

      if (response.status === 201) {
        setCartItems((prevItems) =>
          prevItems.map((item) => {
            if (item.productId === productId) {
              return {
                ...item,
                numberProduct: newQuantity,
              };
            }
            return item;
          })
        );
        console.log("Cart items:", cartItems);
      } else {
        console.error("Failed to update cart item quantity");
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  // Xử lý mở modal xác nhận xóa sản phẩm khỏi giỏ hàng
  const handleOpenModal = (productId) => {
    setItemToDelete(productId); // Sử dụng productId để xác định mục cần xóa
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) {
      console.error("Item muốn xóa không hợp lệ");
      return;
    }

    const item = cartItems.find(
      (cartItem) => cartItem.productId === itemToDelete
    );
    if (!item) {
      console.error("Item muốn xóa không tồn tại trong giỏ hàng");
      return;
    }

    const cartDTO = {
      buyer: user._id,
      productId: item.productId,
      classifyId: item.classifyId,
      seller: item.seller,
      numberProduct: item.numberProduct,
    };

    try {
      const response = await deleteCartItem(cartDTO);
      if (response.status === 201) {
        setCartItems((prevItems) =>
          prevItems.filter((cartItem) => cartItem.productId !== itemToDelete)
        );
        setShowNotification(true);
      } else {
        console.error("Xoá sản phẩm không thành công");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  // Xử lý hủy xóa sản phẩm khỏi giỏ hàng
  const handleCancelDelete = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="shopping-cart">
      {showNotification && (
        <Notification
          message="Xóa sản phẩm thành công!"
          onClose={() => setShowNotification(false)}
        />
      )}
      <Navbar />
      <div className="cart-content">
        <h2>Giỏ hàng của bạn</h2>
        <div className="cart-items">
          {cartItems.map((item) => {
            const product = productData[item.productId];
            const classify =
              selectedClassifies[`${item.productId}-${item.classifyId}`];
            const itemPrice = classify?.price || item.price;
            const totalPrice = itemPrice * item.numberProduct;

            return (
              <div
                key={`${item.productId}-${item.classifyId}`}
                className="item-cart"
              >
                <div className="product-info">
                  <img
                    src={prod1}
                    alt={product?.productName || "Product Image"}
                  />
                  <div className="detail">
                    <h3>{product?.productName || "Loading..."}</h3>
                    {classify && (
                      <>
                        <p>{classify?.key}</p>
                        <p>{classify?.value}</p>
                      </>
                    )}
                    <p>Brand: {product?.brand || "Loading..."}</p>
                  </div>
                </div>
                <div className="product-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.productId, -1)}
                    className="subtraction"
                  >
                    -
                  </button>
                  <input type="text" value={item.numberProduct} readOnly />
                  <button
                    onClick={() => handleQuantityChange(item.productId, +1)}
                    className="addition"
                  >
                    +
                  </button>
                </div>
                <div className="product-price">
                  <p>Giá: {itemPrice}đ</p>
                  <p>Tổng: {totalPrice}đ</p>
                </div>
                <div className="product-action">
                  <button
                    onClick={() => handleOpenModal(item.productId)}
                    className="btn-delete"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}
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
