import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Products.css";
import Category from "../../components/Category/Category";

const Products = () => {
  return (
    <div className="container">
      <Navbar />
      <Category />
    </div>
  );
};

export default Products;
