import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FooterSection from "../../components/Sections/FooterSection";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("paid");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // Example orders data
  const paidOrders = [
    {
      id: "#001",
      productName: "Sản phẩm A",
      price: "1 triệu VND",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      category: "Category A",
      orderDate: "2024-09-25",
      deliveryAddress: "123 Đường A, Quận B",
      receiverPhone: "0123456789",
      type: "Type A",
      quantity: 2,
      totalPrice: "2 triệu VND",
    },
    {
      id: "#002",
      productName: "Sản phẩm B",
      price: "2 triệu VND",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand B",
      category: "Category B",
      orderDate: "2024-09-26",
      deliveryAddress: "456 Đường C, Quận D",
      receiverPhone: "0987654321",
      type: "Type B",
      quantity: 1,
      totalPrice: "2 triệu VND",
    },
  ];

  const unpaidOrders = [
    {
      id: "#003",
      productName: "Sản phẩm C",
      price: "500 nghìn VND",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand C",
      category: "Category C",
      orderDate: "2024-09-27",
      deliveryAddress: "789 Đường E, Quận F",
      receiverPhone: "0981234567",
      type: "Type C",
      quantity: 3,
      totalPrice: "1.5 triệu VND",
    },
    {
      id: "#004",
      productName: "Sản phẩm D",
      price: "1.5 triệu VND",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand D",
      category: "Category D",
      orderDate: "2024-09-28",
      deliveryAddress: "101 Đường G, Quận H",
      receiverPhone: "0901234567",
      type: "Type D",
      quantity: 1,
      totalPrice: "1.5 triệu VND",
    },
  ];

  const orders = activeTab === "paid" ? paidOrders : unpaidOrders;

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCancelOrder = () => {
    console.log("Order cancelled for reason:", cancelReason);
    // Handle order cancellation here (e.g., call API)
    setModalOpen(false); // Close the modal after cancellation
  };

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
                  <button
                    className="mt-2 sm:mt-0 sm:ml-4 transition duration-300"
                    onClick={() => handleOrderDetails(order)}
                  >
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

      {/* Modal for Order Details */}
      {selectedOrder && (
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chi tiết đơn hàng</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="space-y-4">
                <p>
                  <strong>Tên sản phẩm:</strong> {selectedOrder.productName}
                </p>
                <img
                  src={selectedOrder.imageUrl}
                  alt={selectedOrder.productName}
                  className="w-32 h-32 object-cover rounded-md mx-auto"
                />
                <p>
                  <strong>Thương hiệu:</strong> {selectedOrder.brand}
                </p>
                <p>
                  <strong>Danh mục:</strong> {selectedOrder.category}
                </p>
                <p>
                  <strong>Giá:</strong> {selectedOrder.price}
                </p>
                <p>
                  <strong>Địa chỉ giao hàng:</strong>{" "}
                  {selectedOrder.deliveryAddress}
                </p>
                <p>
                  <strong>Số điện thoại người nhận:</strong>{" "}
                  {selectedOrder.receiverPhone}
                </p>
                <p>
                  <strong>Loại sản phẩm:</strong> {selectedOrder.type}
                </p>
                <p>
                  <strong>Số lượng:</strong> {selectedOrder.quantity}
                </p>
                <p>
                  <strong>Tổng tiền:</strong> {selectedOrder.totalPrice}
                </p>

                {/* Cancel Order Button */}
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg w-full mt-4"
                  onClick={() => setCancelReason("")}
                >
                  Huỷ đơn hàng
                </button>

                {/* Payment Button for Unpaid Orders */}
                {activeTab === "unpaid" && (
                  <button className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4">
                    Thanh toán ngay
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
