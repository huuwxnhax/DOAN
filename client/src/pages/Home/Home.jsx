import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import SliderSection from "../../components/Sections/SliderSection";
import BannerSection from "../../components/Sections/BannerSection";
import BrandSection from "../../components/Sections/BrandSection";
import CategorySection from "../../components/Sections/CategorySection";
import ProductSection from "../../components/Sections/ProductSection";
import FooterSection from "../../components/Sections/FooterSection";

const Home = () => {
  return (
    <div className="container">
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
          <ProductSection />
        </section>

        <section className="footer">
          <FooterSection />
        </section>
      </div>
    </div>
  );
};

export default Home;
