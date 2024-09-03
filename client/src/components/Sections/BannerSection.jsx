import React from "react";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";

const BannerSection = () => {
  return (
    <div className="banner-section">
      <div className="banner-item">
        <img src={banner1} alt="Banner" />
      </div>
      <div className="banner-item">
        <img src={banner2} alt="Banner" />
      </div>
    </div>
  );
};

export default BannerSection;
