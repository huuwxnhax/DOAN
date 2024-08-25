import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import prod1 from "../../assets/images/prod1.webp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const history = ["Shoes", "T-shirts", "Smartphones", "Laptops"];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState(history);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = (e) => {
    if (searchTerm) {
      setSearchHistory([...searchHistory, searchTerm]);
      setSearchTerm("");
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

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          E-commerce
        </Link>
        <div className="search-container">
          <input
            onFocus={() => setShowHistory(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setShowHistory(false)}
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
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

        <ul className="navLinks">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="dropdown">
            <button className="btn-cart-cirle">
              <ShoppingCartIcon />
            </button>
            <div className="dropdown-content">
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
                <div className="cart-item">
                  <img
                    src={prod1}
                    alt="Product Image"
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <span className="cart-item-label">Combo khuyến mãi</span>
                    <span className="cart-item-name">
                      Dép gia đình chống trượt transparent
                    </span>
                    <span className="cart-item-price">27.000₫</span>
                  </div>
                </div>
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
            </div>
          </li>

          {user ? (
            <div className="dropdown">
              <Avatar
                alt="User"
                src={user.avatar || "https://via.placeholder.com/150"}
                style={{ cursor: "pointer" }}
              />

              <div className="dropdown-content dropdown-profile">
                <a href="/profile">My profile</a>
                <a href="/settings">Settings</a>
                <a href="" onClick={handleLogout}>
                  Sign Out
                </a>
              </div>
            </div>
          ) : (
            <li>
              <Link className="link" to="/signin">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
