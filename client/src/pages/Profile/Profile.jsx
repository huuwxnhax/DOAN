import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

import Options from "../../components/Options/Options";
import ProfileSection from "../../components/Sections/ProfileSection";
import AddressSection from "../../components/Sections/AddressSection";

const Profile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className="container">
      <Navbar />
      <div className="content content-flex">
        <section className="profile-section">
          <ProfileSection />
          {/* <AddressSection /> */}
        </section>
        <section className="options">
          <Options width={width} />
        </section>
      </div>
    </div>
  );
};

export default Profile;
