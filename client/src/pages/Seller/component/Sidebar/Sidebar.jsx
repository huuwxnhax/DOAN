const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Big Supermarket</div>
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
          <li
            className={`p-4 hover:bg-gray-700 cursor-pointer ${
              activeTab === "products" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
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
