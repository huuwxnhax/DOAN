import React from "react";
import { useLocation } from "react-router-dom";
import ProductSection from "../Sections/ProductSection";

const ProductSearch = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const valueToSearch = location.state?.valueToSearch || "";
  const productByCate = location.state?.products || [];
  const cateName = location.state?.categoryName || "";

  const hasSearchResults = searchResults.length > 0;
  const hasCategoryProducts = productByCate.length > 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-[70%] mx-auto py-8">
        {/* Search Header */}
        <div className="bg-white p-5 rounded-s">
          {valueToSearch && (
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Kết Quả Tìm Kiếm Cho: "{valueToSearch}"
            </h1>
          )}
          {!valueToSearch && cateName && (
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Sản Phẩm Theo Danh Mục: "{cateName}"
            </h1>
          )}
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {hasSearchResults ? (
            <ProductSection products={searchResults} />
          ) : hasCategoryProducts ? (
            <ProductSection products={productByCate} />
          ) : (
            <p className="text-center text-gray-700">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
