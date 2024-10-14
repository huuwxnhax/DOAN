import React from "react";
import { useLocation } from "react-router-dom";
import ProductSection from "../Sections/ProductSection";

const ProductSearch = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const valueToSearch = location.state?.valueToSearch || "";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-[70%] mx-auto py-8">
        {/* Search Header */}
        <div className="bg-white p-5 rounded-s">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Kết Quả Tìm Kiếm Cho: "{valueToSearch}"
          </h1>
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          <ProductSection products={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
