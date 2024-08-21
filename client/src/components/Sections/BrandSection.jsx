import React from "react";
import brand1 from "../../assets/images/brand1.jpg";
import brand2 from "../../assets/images/brand2.jpg";
import brand3 from "../../assets/images/brand3.png";
import brand4 from "../../assets/images/brand4.png";
import brand5 from "../../assets/images/brand5.png";
import { Link } from "react-router-dom";

const BrandSection = () => {
  return (
    <div className="brand-section">
      <div className="title-header">
        <h3 className="h3-title">Top Brands</h3>
      </div>
      <div className="brand-container">
        <Link to="/bran1" className="brand-item">
          <img src={brand1} alt="Brand 1" />
        </Link>
        <Link to="/bran1" className="brand-item">
          <img src={brand2} alt="Brand 2" />
        </Link>
        <Link to="/bran1" className="brand-item">
          <img src={brand3} alt="Brand 3" />
        </Link>
        <Link to="/bran1" className="brand-item">
          <img src={brand4} alt="Brand 4" />
        </Link>
        <Link to="/bran1" className="brand-item">
          <img src={brand5} alt="Brand 5" />
        </Link>
      </div>
    </div>
  );
};

export default BrandSection;
