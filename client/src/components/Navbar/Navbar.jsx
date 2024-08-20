import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const user = true;
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          My E-commerce
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
          <li>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
          </li>
          {user ? (
            <li>
              <Avatar
                alt="User"
                src="https://via.placeholder.com/150"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{ cursor: "pointer" }}
              />
              <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                PaperProps={{
                  sx: {
                    mt: 7,
                    ml: -2,
                  },
                }}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <MenuItem onClick={handlePopoverClose}>
                  <Link to="/profile" className="dropdown-link link">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handlePopoverClose}>
                  <Link to="/settings" className="dropdown-link link">
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem onClick={handlePopoverClose}>
                  <Link to="/logout" className="dropdown-link link">
                    Sign Out
                  </Link>
                </MenuItem>
              </Popover>
            </li>
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
