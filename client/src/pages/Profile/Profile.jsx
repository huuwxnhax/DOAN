import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

import Options from "../../components/Options/Options";
import ProfileSection from "../../components/Sections/ProfileSection";
import AddressSection from "../../components/Sections/AddressSection";

const Profile = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="content content-flex">
        <section className="profile-section">
          <ProfileSection />
          {/* <AddressSection /> */}
        </section>
        <section className="options">
          <Options />
        </section>
      </div>
    </div>
  );
};

export default Profile;
