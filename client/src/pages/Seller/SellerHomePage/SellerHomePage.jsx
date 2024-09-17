import React from "react";
import "../../Seller/SellerHomePage/SellerHomePage.css";
import Sidebar from "../component/Sidebar/Sidebar";
import Dashboard from "../component/Dashboard/Dashboard";
import { useState } from "react";
import ProductTable from "../component/ProductTable/ProductTable";
import AddProduct from "../component/AddProduct/AddProduct";

const SellerHomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="flex-1">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "add-product" && <AddProduct />}
        {activeTab === "view-product" && (
          <ProductTable setActiveTab={setActiveTab} />
        )}
        {/* Thêm các tab khác như orders, customers */}
      </div>
    </div>
  );
};

export default SellerHomePage;
