import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Products.css";
import Category from "../../components/Category/Category";
import FooterSection from "../../components/Sections/FooterSection";

const Products = () => {
  return (
    <div className="container">
      <Navbar />
      <Category />
      <div className="footer-prod">
        <FooterSection />
      </div>
    </div>
  );
};

export default Products;