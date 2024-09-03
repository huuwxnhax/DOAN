import React from "react";
import brand1 from "../../assets/images/brand1.jpg";
import brand2 from "../../assets/images/brand2.jpg";
import brand3 from "../../assets/images/brand3.png";
import brand4 from "../../assets/images/brand4.png";
import brand5 from "../../assets/images/brand5.png";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { useEffect } from "react";

const BrandSection = () => {
  const brands = [
    { id: 1, name: "Brand 1", image: brand1 },
    { id: 2, name: "Brand 2", image: brand2 },
    { id: 3, name: "Brand 3", image: brand3 },
    { id: 4, name: "Brand 4", image: brand4 },
    { id: 5, name: "Brand 5", image: brand5 },
    { id: 6, name: "Brand 6", image: brand1 },
    { id: 7, name: "Brand 7", image: brand2 },
    { id: 8, name: "Brand 8", image: brand3 },
    { id: 9, name: "Brand 9", image: brand4 },
    { id: 10, name: "Brand 10", image: brand5 },
  ];

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
    if (startIndex < brands.length - itemsPerPage) {
      setStartIndex(startIndex + 1);
    }
  };
  return (
    <div className="brand-section">
      <div style={{ padding: 20 }}>
        <div className="title-header">
          <h3 className="h3-title">Thương Hiệu Nổi Bật</h3>
        </div>
        <div className="brand-container">
          <button
            className="arrow-btn left"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <div className="brand-list">
            {brands
              .slice(startIndex, startIndex + itemsPerPage)
              .map((brand) => (
                <Link
                  key={brand.id}
                  to={`/brand/${brand.id}`}
                  className="brand-item"
                >
                  <img src={brand.image} alt={brand.name} />
                </Link>
              ))}
          </div>
          <button
            className="arrow-btn right"
            onClick={handleNext}
            disabled={startIndex >= brands.length - itemsPerPage}
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
