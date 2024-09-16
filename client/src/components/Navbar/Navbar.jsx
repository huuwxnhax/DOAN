import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar, Drawer, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import prod1 from "../../../public/images/prod1.webp";
import { useRef } from "react";
import { useEffect } from "react";
import { logout } from "../../features/authSlice";
import { getCartItemByBuyerId } from "../../api/cartAPI";
import { getClassifiesByProductId, getProductById } from "../../api/productAPI";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const subNavbarLinksRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const history = ["Shoes", "T-shirts", "Smartphones", "Laptops"];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState(history);
  const [showHistory, setShowHistory] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [productData, setProductData] = useState({});
  const [selectedClassifies, setSelectedClassifies] = useState({});

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearch = (e) => {
    if (searchTerm) {
      setSearchHistory([...searchHistory, searchTerm]);
      setSearchTerm("");
      setShowHistory(false);
    }
  };

  const handleClickHistory = (term) => {
    setSearchTerm(term);
    setShowHistory(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleShowCart = async () => {
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

    if (isMobile) {
      setOpenDrawer((prev) => !prev);
    } else {
      setShowCart((prev) => !prev);
    }
  };

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

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);

    const subNavbarLinks = document.querySelector(".sub-navbar-links");

    if (!showMenu) {
      // Khi mở menu
      subNavbarLinks.style.maxHeight = `${subNavbarLinks.scrollHeight}px`;
    } else {
      // Khi đóng menu
      subNavbarLinks.style.maxHeight = "0";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Khi màn hình lớn hơn 768px (tablet/desktop), luôn hiển thị sub-navbar
        if (subNavbarLinksRef.current) {
          subNavbarLinksRef.current.style.maxHeight = "none";
        }
      } else {
        // Khi màn hình nhỏ hơn 768px (mobile), đặt lại trạng thái cho sub-navbar
        if (subNavbarLinksRef.current && !showMenu) {
          subNavbarLinksRef.current.style.maxHeight = "0";
        }
      }
    };
    // Gọi hàm handleResize một lần khi component mount
    handleResize();

    // Thêm sự kiện lắng nghe resize
    window.addEventListener("resize", handleResize);

    // Cleanup khi component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [showMenu]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowProfile = () => {
    console.log("show profile");
    setShowProfile((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false); // Close the dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <h2>Ecommerce</h2>
          </div>
          <div className="navbar-search">
            {/* <div className="search-icon">
              <SearchIcon />
            </div> */}
            <input
              value={searchTerm}
              onFocus={() => setShowHistory(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setShowHistory(false)}
              className="search-input"
              type="text"
              placeholder="Nhập tên sản phẩm bạn muốn tìm"
            />
            <button className="search-btn">
              <SearchIcon />
            </button>
            {showHistory && (
              <div className="search-history">
                {searchHistory.map((term, index) => (
                  <p
                    className="history-item"
                    key={index}
                    onClick={() => handleClickHistory(term)}
                  >
                    {term}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="cart-avatar">
            <div className="navbar-cart" ref={cartRef}>
              <button className="cart-btn" onClick={handleShowCart}>
                <ShoppingCartIcon />
                {/* <span className="cart-count">3</span> */}
              </button>
              {!isMobile && showCart && (
                <div className={`dropdown-content ${showCart ? "show" : ""}`}>
                  <div className="cart-title">Sản Phẩm Mới Thêm</div>
                  {cartItems.map((item) => {
                    const product = productData[item.productId];
                    const classify =
                      selectedClassifies[
                        `${item.productId}-${item.classifyId}`
                      ];
                    const itemPrice = classify?.price || item.price;
                    return (
                      <div
                        className="cart-item-container"
                        key={`${item.productId}-${item.classifyId}`}
                      >
                        <div className="cart-item">
                          <img
                            src={prod1}
                            alt={product?.productName || "Product Image"}
                            className="cart-item-img"
                          />
                          <div className="cart-item-info">
                            <span className="cart-item-label">
                              Combo khuyến mãi
                            </span>
                            <span className="cart-item-name">
                              {product?.productName || "Loading..."}
                            </span>
                            <span className="cart-item-price">{itemPrice}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <a href="/cart" className="view-cart-button">
                    Xem Giỏ Hàng
                  </a>
                </div>
              )}
              <Drawer
                anchor="bottom"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                PaperProps={{
                  style: {
                    height: "60vh",
                    overflow: "auto",
                    padding: "16px",
                  },
                }}
              >
                <div className="cart-title">Sản Phẩm Mới Thêm</div>
                <div className="cart-item-container">
                  <div className="cart-item">
                    <img
                      src={prod1}
                      alt="Product Image"
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <span className="cart-item-label">Combo khuyến mãi</span>
                      <span className="cart-item-name">
                        Dép gia đình chống trượt
                      </span>
                      <span className="cart-item-price">27.000₫</span>
                    </div>
                  </div>
                </div>
                <a href="/cart" className="view-cart-button">
                  Xem Giỏ Hàng
                </a>
              </Drawer>
            </div>
            <div className="navbar-avatar">
              {user ? (
                <div ref={profileRef}>
                  <Avatar
                    alt="User"
                    src={user.avata || ""}
                    style={{ cursor: "pointer" }}
                    onClick={handleShowProfile}
                  />
                  {showProfile && (
                    <div
                      className={`dropdown-content dropdown-profile ${
                        showProfile ? "show" : ""
                      }`}
                    >
                      <a href="/profile">Thông Tin Cá Nhân</a>
                      <a href="/orders">Đơn Hàng Của Bạn</a>
                      <a href="/cart">Giỏ Hàng</a>
                      <a href="/wishlist">Sản Phẩm Yêu Thích</a>
                      <a href="/notifications">Thông Báo</a>
                      <a href="/settings">Cài Đặt</a>
                      <a onClick={handleLogout}>Đăng Xuất</a>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="nav-auth">
                    <Link className="link" to="/signin">
                      Đăng Nhập
                    </Link>
                    <Link className="link primary-btn" to="/signup">
                      Đăng Ký
                    </Link>
                  </div>
                  <div className="nav-auth-mobile">
                    {/* <AccountCircleOutlinedIcon /> */}
                    <div>
                      <Link className="link" to="/signin">
                        Đăng Nhập
                      </Link>
                      {/* <Link className="link primary-btn" to="/signup">
                        Đăng Ký
                      </Link> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Search bar for mobile */}
        <div className="navbar-search-mobile">
          {/* <div className="search-icon">
            <SearchIcon />
          </div> */}
          <input
            value={searchTerm}
            onFocus={() => setShowHistory(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setShowHistory(false)}
            className="search-input"
            type="text"
            placeholder="Nhập tên sản phẩm bạn muốn tìm"
          />
          <button className="search-btn">
            <SearchIcon />
          </button>
          {showHistory && (
            <div className="search-history">
              {searchHistory.map((term, index) => (
                <p
                  className="history-item"
                  key={index}
                  onClick={() => handleClickHistory(term)}
                >
                  {term}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="sub-navbar">
          <div>
            <button className="menu-btn" onClick={toggleMenu}>
              ☰ Menu {/* use when reponsive design */}
            </button>
          </div>
          <div
            ref={subNavbarLinksRef}
            className={`sub-navbar-links ${showMenu ? "show" : ""}`}
          >
            <div className="sub-navbar-section">
              <Link className="subnavbar-link" to="/">
                Trang Chủ
              </Link>
              <Link className="subnavbar-link" to="/products">
                Sản phẩm
              </Link>
              <Link className="subnavbar-link" to="/categories">
                Danh Mục
              </Link>
            </div>

            <div className="sub-navbar-section">
              <Link className="subnavbar-link" to="/help">
                Hỗ trợ
              </Link>
              <Link className="subnavbar-link" to="/contact">
                Liên Hệ
              </Link>
              <Link className="subnavbar-link" to="/faq">
                FAQ
              </Link>
              {user?.role.includes("ADMIN") ? (
                <Link className="subnavbar-link" to="/admin">
                  Trang Admin
                </Link>
              ) : user?.role.includes("SELLER") ? (
                <Link className="subnavbar-link" to="/seller">
                  Trang Người Bán
                </Link>
              ) : user?.role.includes("BUYER") ? (
                <Link className="subnavbar-link" to="/buyer">
                  Trở Thành Người Bán
                </Link>
              ) : (
                <Link className="subnavbar-link" to="/buyer">
                  Trở Thành Người Bán
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
