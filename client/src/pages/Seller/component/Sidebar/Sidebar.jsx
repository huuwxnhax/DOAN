import { useState } from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">SELLER CENTER</div>
      <nav>
        <ul>
          <li
            className={`p-4 hover:bg-gray-700 cursor-pointer ${
              activeTab === "dashboard" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>

          {/* Products Section with Dropdown */}
          <li className="cursor-pointer">
            <div
              className={`p-4 flex justify-between items-center ${
                isProductsDropdownOpen ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={toggleProductsDropdown}
            >
              <span>Products</span>
              <span>{isProductsDropdownOpen ? "▼" : "►"}</span>
            </div>

            {/* Dropdown for Products */}
            {isProductsDropdownOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li
                  className={`p-2 pl-4 hover:bg-gray-700 cursor-pointer ${
                    activeTab === "add-product" ? "bg-gray-700" : ""
                  }`}
                  onClick={() => setActiveTab("add-product")}
                >
                  Add Product
                </li>
                <li
                  className={`p-2 pl-4 hover:bg-gray-700 cursor-pointer ${
                    activeTab === "view-product" ? "bg-gray-700" : ""
                  }`}
                  onClick={() => setActiveTab("view-product")}
                >
                  View Product
                </li>
              </ul>
            )}
          </li>

          <li
            className={`p-4 hover:bg-gray-700 cursor-pointer ${
              activeTab === "orders" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;