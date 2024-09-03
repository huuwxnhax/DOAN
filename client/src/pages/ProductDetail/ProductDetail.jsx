import React, { useState } from "react";
import "./ProductDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import product1 from "../../assets/images/product1.webp";
import product2 from "../../assets/images/product2.webp";
import product3 from "../../assets/images/product3.webp";
import product4 from "../../assets/images/product4.webp";
import prodBanner1 from "../../assets/images/prodBanner1.webp";
import prodBanner2 from "../../assets/images/prodBanner2.webp";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Rating, Typography } from "@mui/material";
import FooterSection from "../../components/Sections/FooterSection";
import ProductSection from "../../components/Sections/ProductSection";
import DetailList from "../../components/DetailList/DetailList";
import PurchaseModal from "../../components/PurchaseModal/PurchaseModal";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../features/cateSlice";

const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(product1);
  const [startIndex, setStartIndex] = useState(0);
  const [rating, setRating] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  const productDetails = [
    { key: "Kho", value: "500" },
    { key: "Thương hiệu", value: "FURJKO HOME" },
    { key: "Hạn bảo hành", value: "5 năm" },
    { key: "Loại bảo hành", value: "Bảo hành nhà sản xuất" },
    { key: "Độ cứng nệm & gối", value: "Êm" },
    {
      key: "Tính năng nệm",
      value: "Đường viền cơ thể, Thoải mái, Hỗ trợ cổ & lưng",
    },
    { key: "Loại nệm", value: "Foam Mattress" },
    { key: "Xuất xứ", value: "Trong nước" },
    { key: "Sản phẩm đặt theo yêu cầu", value: "Không" },
    { key: "Kích cỡ giường", value: "1M2X2M, 1M4X2M, 1M6X2M, 1M8X2M, 2M2X2M" },
    {
      key: "Kích thước (dài x rộng x cao)",
      value: "1M2/1M4/1M6/1M8/2M2 X 2M X 10CM",
    },
    { key: "Chiều dài", value: "2m" },
    { key: "Tên tổ chức chịu trách nhiệm sản xuất", value: "CT TNHH ZAVINA" },
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

  // get the highest price of all classifies
  const getPrice = (classifies) => {
    if (classifies.length === 0) return 0;
    return Math.max(...classifies.map((classify) => classify.price));
  };

  // group classifies by key
  const groupClassifies = product?.classifies.reduce((groups, classify) => {
    if (!groups[classify.key]) {
      groups[classify.key] = [];
    }
    groups[classify.key].push(classify);
    return groups;
  }, {});

  // handle option change
  const handleOptionChange = (key, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  // Tính toán tổng giá trị dựa trên các tùy chọn đã chọn
  const calculateTotalPrice = () => {
    const selectedClassifies = Object.entries(selectedOptions).map(
      ([key, value]) => groupClassifies[key].find((cls) => cls.value === value)
    );

    const basePrice = selectedClassifies.reduce((total, classify) => {
      return total + classify.price * quantity;
    }, 0);

    return basePrice;
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

  const handleMouseEnter = (image) => {
    setCurrentImage(image);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
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
                {calculateTotalPrice() === 0
                  ? getPrice(product.classifies)
                  : calculateTotalPrice()}
                đ
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
          {/* <div className="detail-color">
            <span>Màu sắc: </span>
            <span>Đỏ</span>
          </div> */}
          {/* <div className="detail-model">
            <img src={product1} alt="Product" />
            <img src={product1} alt="Product" />
            <img src={product1} alt="Product" />
            <img src={product1} alt="Product" />
            <img src={product1} alt="Product" />
          </div> */}
          {Object.entries(groupClassifies).map(([key, classifies]) => (
            <div className="detail-classifies" key={key}>
              <span>{key}</span>
              {classifies.map((classify) => (
                <button
                  key={classify._id}
                  className={`size-btn ${
                    selectedOptions[key] === classify.value ? "selected" : ""
                  }`}
                  onClick={() => handleOptionChange(key, classify.value)}
                >
                  {classify.value}
                  {selectedOptions[key] === classify.value && " ✔️"}
                </button>
              ))}
            </div>
          ))}

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
            <button className="add-cart-btn">Thêm vào giỏ hàng</button>
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
          {/* <span>
            Khô gà lá chanh Cobi Food hộp 300g xé giòn, đậm vị, cay vừa, đồ ăn
            vặt không chứa phẩm màu
          </span>
          <ul>
            <li>
              Nguyên liệu: Thịt ức gà tươi, lá chanh, muối, đường, ớt, tỏi, gia
              vị.
            </li>
            <li>Khối lượng: 300g.</li>
            <li>Thương hiệu: Cobi Food.</li>
            <li>Độ cay: Vừa.</li>
            <li>Đóng gói: Hộp giấy.</li>
            <li>Hạn sử dụng: 6 tháng kể từ ngày sản xuất.</li>
            <li>
              Bảo quản: Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.
            </li>
          </ul> */}
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
