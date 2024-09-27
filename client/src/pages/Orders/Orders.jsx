import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FooterSection from "../../components/Sections/FooterSection";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("paid");

  // Example orders data
  const paidOrders = [
    {
      id: "#001",
      productName: "Sản phẩm A",
      price: "1 triệu VND",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "#002",
      productName: "Sản phẩm B",
      price: "2 triệu VND",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  const unpaidOrders = [
    {
      id: "#003",
      productName: "Sản phẩm C",
      price: "500 nghìn VND",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "#004",
      productName: "Sản phẩm D",
      price: "1.5 triệu VND",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  const orders = activeTab === "paid" ? paidOrders : unpaidOrders;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          {/* Header with Tabs (Styled like navigation bar) */}
          <div className="flex border-b-2 border-gray-300 mb-6">
            <div
              onClick={() => setActiveTab("paid")}
              className={`py-3 px-6 cursor-pointer font-bold ${
                activeTab === "paid"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Đơn hàng thanh toán rồi
            </div>
            <div
              onClick={() => setActiveTab("unpaid")}
              className={`py-3 px-6 cursor-pointer font-bold ${
                activeTab === "unpaid"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Đơn hàng chưa thanh toán
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={order.imageUrl}
                    alt={order.productName}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{order.productName}</h3>
                    <p className="text-sm text-gray-500">Mã đơn: {order.id}</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold">{order.price}</p>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:justify-end sm:w-auto mt-4 sm:mt-0">
                  <button className="mt-2 sm:mt-0 sm:ml-4 transition duration-300">
                    <span className="hidden sm:inline bg-blue-500 text-white py-2 px-4 rounded-lg">
                      Chi tiết đơn hàng
                    </span>
                    <span className="inline sm:hidden flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg">
                      <VisibilityOutlinedIcon className="text-white text-xl" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Orders;
