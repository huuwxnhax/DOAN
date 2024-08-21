import React from "react";
import { useState } from "react";
import ProductSection from "../Sections/ProductSection";

const Category = () => {
  const sortOptions = [
    { name: "Phổ biến", value: "popular" },
    { name: "Mới nhất", value: "newest" },
    { name: "Giá giảm dần", value: "price-asc" },
    { name: "Giá cao dần", value: "price-desc" },
  ];

  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

  const handleSortClick = (option) => {
    setSelectedSort(option.value);
  };

  return (
    <div className="category">
      <div className="category-left">
        <div className="category-filter">
          <h5 className="category__filter-title">Danh mục sản phẩm</h5>
          <ul className="category__filter-list">
            <li className="category__filter-item">
              <a href="#category" className="category__filter-link">
                Tất cả
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#category" className="category__filter-link">
                Điện thoại
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#category" className="category__filter-link">
                Laptop
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#category" className="category__filter-link">
                Máy ảnh
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#category" className="category__filter-link">
                Phụ kiện
              </a>
            </li>
          </ul>
        </div>
        <div className="category__filter">
          <h5 className="category__filter-title">Thương hiệu</h5>
          <ul className="category__filter-list">
            <li className="category__filter-item">
              <a href="#brand" className="category__filter-link">
                Tất cả
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#brand" className="category__filter-link">
                Apple
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#brand" className="category__filter-link">
                Samsung
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#brand" className="category__filter-link">
                Sony
              </a>
            </li>
            <li className="category__filter-item">
              <a href="#brand" className="category__filter-link">
                Canon
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="category-right">
        <div className="product-sort">
          <h5>Sắp xếp theo</h5>
          {sortOptions.map((option) => (
            <a
              href={`#${option.value}`}
              key={option.value}
              onClick={() => handleSortClick(option)}
              className={`sort-btn ${
                selectedSort === option.value ? "active" : ""
              }`}
            >
              {option.name}
            </a>
          ))}
        </div>
        <div className="product-list">
          <ProductSection />
        </div>
      </div>
    </div>
  );
};

export default Category;
