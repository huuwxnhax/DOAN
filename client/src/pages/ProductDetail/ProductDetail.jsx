import React, { useState } from "react";
import "./ProductDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import product1 from "../../../public/images/product1.webp";
import product2 from "../../../public/images/product2.webp";
import product3 from "../../../public/images/product3.webp";
import product4 from "../../../public/images/product4.webp";
import prodBanner1 from "../../../public/images/prodBanner1.webp";
import prodBanner2 from "../../../public/images/prodBanner2.webp";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Rating, Typography } from "@mui/material";
import FooterSection from "../../components/Sections/FooterSection";
import DetailList from "../../components/DetailList/DetailList";
import PurchaseModal from "../../components/PurchaseModal/PurchaseModal";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../features/cateSlice";
import { addToCart } from "../../api/cartAPI";
import Notification from "../../components/Notification/Notification";

const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(product1);
  const [startIndex, setStartIndex] = useState(0);
  const [rating, setRating] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [groupClassifies, setGroupClassifies] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const itemAddToCart = {
    buyer: user._id,
    productId: "",
    classifyId: "",
    seller: "",
    numberProduct: quantity,
  };

  const productDetails = [
    { key: "Kho", value: "500" },
    { key: "Thương hiệu", value: "FURJKO HOME" },
    { key: "Hạn bảo hành", value: "5 năm" },
    { key: "Loại bảo hành", value: "Bảo hành nhà sản xuất" },
    { key: "Độ cứng nệm & gối", value: "Êm" },
  ];

  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  // get all categories from redux store
  const categories = useSelector((state) => selectAllCategories(state));

  // find category name by category id
  const findCategoryName = (categoryId) => {
    return categories.find((cate) => cate._id === categoryId)?.categoriesName;
  };

  // group classifies by key
  useEffect(() => {
    if (product && product.classifies) {
      const grouped = product.classifies.reduce((groups, classify) => {
        if (!groups[classify.key]) {
          groups[classify.key] = [];
        }
        groups[classify.key].push(classify);
        return groups;
      }, {});
      setGroupClassifies(grouped);
      console.log(grouped);
    }
  }, [product]);

  // handle option change
  const handleOptionChange = (key, classify) => {
    if (classify.stock > 0) {
      setSelectedOptions(classify);
    }
  };

  // get the lowest price of all classifies
  const getPrice = (classifies) => {
    if (!classifies || classifies.length === 0) return 0; // Return 0 if no classifies
    const prices = classifies
      .map((classify) => classify.price)
      .filter((price) => price > 0);
    return prices.length > 0 ? Math.min(...prices) : 0; // Return the minimum price, or 0 if no valid prices
  };

  // Calculate total price based on selected option
  const calculateTotalPrice = () => {
    if (selectedOptions && selectedOptions.price > 0) {
      return selectedOptions.price * quantity;
    }
    // Return the lowest price if no classification is selected
    const allClassifies = Object.values(groupClassifies).flat();
    console.log(allClassifies);
    return getPrice(allClassifies) * quantity;
  };

  // scroll to top when component mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const images = [product1, product2, product3, product4];
  const visibleThumbnail = images.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    if (startIndex < images.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleKeyChange = (key) => {
    setSelectedKey(key);
    setSelectedValue("");
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setSelectedOptions(value);
  };

  const handleMouseEnter = (image) => {
    setCurrentImage(image);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    itemAddToCart.productId = product._id;
    itemAddToCart.seller = product.seller;
    itemAddToCart.classifyId = selectedOptions._id;
    console.log(itemAddToCart);
    try {
      const response = await addToCart(itemAddToCart);
      if (response.status === 201) {
        setShowNotification(true);

        console.log(response);
      } else {
        alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      {showNotification && (
        <Notification
          message="Thêm sản phẩm vào giỏ hàng thành công!"
          onClose={() => setShowNotification(false)}
        />
      )}
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-image">
          <div className="main-image">
            <img src={currentImage} alt="Product" />
          </div>
          <div className="thumbnail-section">
            <button
              className="arrow-btn"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              <KeyboardArrowLeftIcon />
            </button>
            <div className="thumnail-container">
              {visibleThumbnail.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  onMouseEnter={() => handleMouseEnter(image)}
                  className={currentImage === image ? "active" : ""}
                />
              ))}
            </div>
            <button
              className="arrow-btn"
              onClick={handleNext}
              disabled={startIndex >= images.length - 3}
            >
              <KeyboardArrowRightIcon />
            </button>
          </div>
        </div>
        <div className="product-detail-info">
          <div className="detail-name">
            <h3>{product.productName}</h3>
          </div>
          <div className="detail-address">
            <span>Địa chỉ: </span>
            <span>TP.Hồ Chí Minh, Việt Nam.</span>
          </div>

          <div className="detail-inline">
            <div className="product-type">
              <span>Danh mục: </span>
              <span>{findCategoryName(product.cate)}</span>
            </div>
            <div className="product-rating" style={{ marginLeft: "30%" }}>
              <Rating name="read-only" size="small" value={rating} readOnly />
              <Typography variant="body2" color="text.secondary">
                4.0 (23 đánh giá)
              </Typography>
            </div>
          </div>
          <div className="detail-brand">
            <span>Thương hiệu: </span>
            <a href="#">{product.brand}</a>
          </div>
          <div className="detail-price">
            <div className="product-price">
              <span className="text-secondary price-promotional">
                {calculateTotalPrice()}đ
              </span>
              <span className="text-primary price-original">
                {getPrice(product.classifies)}đ
              </span>
            </div>
            <div>
              <span>Đã bán: </span>
              <span className="text-secondary">{product.selled}</span>
              <span> sản phẩm</span>
            </div>
          </div>

          <div className="detail-classifies">
            {Object.keys(groupClassifies).map((key) => (
              <button
                key={key}
                className={`key-btn ${selectedKey === key ? "selected" : ""}`}
                onClick={() => handleKeyChange(key)}
              >
                {key}
              </button>
            ))}
          </div>
          {selectedKey && (
            <div className="detail-classifies-values">
              {groupClassifies[selectedKey].map((classify) => (
                <button
                  key={classify._id}
                  className={`value-btn ${
                    selectedValue._id === classify._id ? "selected" : ""
                  }`}
                  onClick={() =>
                    classify.stock > 0 && handleValueChange(classify)
                  } // Only allow selection if stock > 0
                  disabled={classify.stock === 0} // Disable if out of stock
                >
                  {classify.value} (
                  {classify.stock > 0 ? "Còn hàng" : "Hết hàng"})
                </button>
              ))}
            </div>
          )}

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
          <div className="detail-action">
            <button onClick={handleAddToCart} className="add-cart-btn">
              Thêm vào giỏ hàng
            </button>
            <button onClick={handleBuyNowClick} className="buy-now-btn">
              Mua ngay
            </button>
            <PurchaseModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              product={product}
            />
          </div>
        </div>
      </div>
      <div className="product-about">
        <div className="detail-product">
          <h3>Thông tin sản phẩm</h3>
          <DetailList details={productDetails} />
          <div className="rating-section">
            <h3>Đánh Giá Sản Phẩm</h3>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
            />
          </div>
        </div>
        <div className="detail-banner">
          <img src={prodBanner1} alt="Banner" />
          <img src={prodBanner2} alt="Banner" />
        </div>
      </div>

      <div className="product-footer">
        <FooterSection />
      </div>
    </div>
  );
};

export default ProductDetail;
