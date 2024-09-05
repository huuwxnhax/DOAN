import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar, Drawer, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import prod1 from "../../assets/images/prod1.webp";
import { useRef } from "react";
import { useEffect } from "react";
import { logout } from "../../features/authSlice";

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

  const handleShowCart = () => {
    if (isMobile) {
      setOpenDrawer((prev) => !prev);
    } else {
      setShowCart((prev) => !prev);
    }
  };

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
                  <div className="cart-item-container">
                    <div className="cart-item">
                      <img
                        src={prod1}
                        alt="Product Image"
                        className="cart-item-img"
                      />
                      <div className="cart-item-info">
                        <span className="cart-item-label">
                          Combo khuyến mãi
                        </span>
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
                    src={user.avatar || "https://via.placeholder.com/150"}
                    style={{ cursor: "pointer" }}
                    onClick={handleShowProfile}
                  />
                  {showProfile && (
                    <div
                      className={`dropdown-content dropdown-profile ${
                        showProfile ? "show" : ""
                      }`}
                    >
                      <a href="/profile">Hồ sơ cá nhân</a>
                      <a href="/settings">Cài đặt</a>
                      <a onClick={handleLogout}>Đăng xuất</a>
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
              <Link className="subnavbar-link" to="/seller">
                Trở thành người bán
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
