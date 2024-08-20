import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  return (
    <>
      <div className="">
        <h3 className="h3-title">Categories</h3>
      </div>
      <div className="category-container">
        <Link to="/category1" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 1" />
          <p>Category 1</p>
        </Link>
        <Link to="/category2" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 2" />
          <p>Category 2</p>
        </Link>
        <Link to="/category1" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 1" />
          <p>Category 1</p>
        </Link>
        <Link to="/category2" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 2" />
          <p>Category 2</p>
        </Link>
        <Link to="/category1" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 1" />
          <p>Category 1</p>
        </Link>
        <Link to="/category2" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 2" />
          <p>Category 2</p>
        </Link>
        <Link to="/category1" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 1" />
          <p>Category 1</p>
        </Link>
        <Link to="/category2" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 2" />
          <p>Category 2</p>
        </Link>
        <Link to="/category1" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 1" />
          <p>Category 1</p>
        </Link>
        <Link to="/category2" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 2" />
          <p>Category 2</p>
        </Link>
        <Link to="/category1" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 1" />
          <p>Category 1</p>
        </Link>
        <Link to="/category2" className="category-item">
          <img src="https://via.placeholder.com/150" alt="Category 2" />
          <p>Category 2</p>
        </Link>
      </div>
    </>
  );
};

export default CategorySection;
