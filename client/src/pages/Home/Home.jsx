import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import SliderSection from "../../components/Sections/SliderSection";
import BannerSection from "../../components/Sections/BannerSection";
import BrandSection from "../../components/Sections/BrandSection";
import CategorySection from "../../components/Sections/CategorySection";
import ProductSection from "../../components/Sections/ProductSection";
import FooterSection from "../../components/Sections/FooterSection";
import { useLocation } from "react-router-dom";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useEffect } from "react";
import Notification from "../../components/Notification/Notification";

const Home = () => {
  const locate = useLocation();
  const successMessage = locate.state ? locate.state.successMessage : "";
  const [showNotification, setShowNotification] = useState(!!successMessage);

  return (
    <div className="container">
      {showNotification && (
        <Notification
          message={successMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
      <Navbar />
      <div className="homepage-content">
        <div className="bg-color-1">
          <div className="slider-banner-section">
            <section className="slider">
              <SliderSection />
            </section>
            <section className="banner">
              <BannerSection />
            </section>
          </div>
        </div>

        <section className="brand">
          <BrandSection />
        </section>

        <section className="category">
          <CategorySection />
        </section>

        <section className="products">
          <ProductSection isHomepage={true} />
        </section>

        <section className="footer">
          <FooterSection />
        </section>
      </div>
    </div>
  );
};

export default Home;
