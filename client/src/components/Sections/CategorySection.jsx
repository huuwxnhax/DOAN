import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllCategories } from "../../features/cateSlice";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect } from "react";
// import "./CategorySection.css"; // Include the updated CSS file

const CategorySection = () => {
  const categories = useSelector((state) => selectAllCategories(state));
  const [startIndex, setStartIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const itemsPerPage = width > 1024 ? 7 : width > 768 ? 4 : 2; // Dynamically adjust based on width

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < categories.length - itemsPerPage) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="category-section">
      <div style={{ padding: 20 }}>
        <div className="category-header">
          <h3 className="h3-title">Danh Mục</h3>
        </div>
        <div className="category-container">
          <button
            className="arrow-btn left"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <div className="category-list">
            {categories
              .slice(startIndex, startIndex + itemsPerPage)
              .map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category._id}`}
                  className="category-item"
                >
                  <img
                    src="https://via.placeholder.com/100"
                    alt={category.categoriesName}
                  />
                  <p>{category.categoriesName}</p>
                </Link>
              ))}
          </div>
          <button
            className="arrow-btn right"
            onClick={handleNext}
            disabled={startIndex >= categories.length - itemsPerPage}
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
