import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Search.css";
import FooterSection from "../../components/Sections/FooterSection";
import ProductSearch from "../../components/ProductSearch/ProductSearch";
const Search = () => {
  return (
    <div>
      <Navbar />

      <div style={{ boxShadow: "none" }}>
        <ProductSearch />
      </div>
      <div className="footer-prod">
        <FooterSection />
      </div>
    </div>
  );
};

export default Search;
