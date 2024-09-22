import React from "react";
import "../../Seller/SellerHomePage/SellerHomePage.css";
import Sidebar from "../component/Sidebar/Sidebar";
import Dashboard from "../component/Dashboard/Dashboard";
import { useState } from "react";
import ProductTable from "../component/ProductTable/ProductTable";
import AddProduct from "../component/AddProduct/AddProduct";
import UpdateProduct from "../component/UpdateProduct/UpdateProduct";

const SellerHomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productEdit, setProductEdit] = useState(null);

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="flex-1">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "add-product" && <AddProduct />}
        {activeTab === "view-product" && (
          <ProductTable
            setActiveTab={setActiveTab}
            setProductEdit={setProductEdit}
          />
        )}
        {activeTab === "update-product" && productEdit && (
          <UpdateProduct product={productEdit} setActiveTab={setActiveTab} />
        )}
        {/* Thêm các tab khác như orders, customers */}
      </div>
    </div>
  );
};

export default SellerHomePage;
