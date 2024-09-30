import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FooterSection from "../../components/Sections/FooterSection";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { getTradeAPI } from "../../api/tradeAPI";
import { useSelector } from "react-redux";
import { getProductById } from "../../api/productAPI";

const Orders = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("paid");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersWithDetails = async () => {
      const fetchedOrders = await getTradeAPI(user._id, user.access_token);

      if (fetchedOrders.status === 200) {
        console.log("Fetched orders", fetchedOrders.data);
        const detailedOrders = await Promise.all(
          fetchedOrders.data.map(async (order) => {
            // Fetch product details for each order
            const productResponse = await getProductById(
              order.products[0].productId
            );

            if (productResponse.status === 200) {
              const productData = productResponse.data[0];

              // Get classify details (if needed, using a classify API)
              const classify = productData.classifies?.find(
                (c) => c._id === order.products[0].classifyId
              );
              console.log("Classify details", classify);

              // Merge product details with order data
              return {
                ...order,
                productName: productData.productName,
                image: productData.images?.[0] || "", // First image
                brand: productData.brand,
                category: productData.category,
                imageUrl: productData.productImages?.[0] || "", // First image
                classify: classify ? classify.value : "N/A", // Classify details
                price: classify ? classify.price : "N/A", // Classify price
                phoneContact: user.number,
              };
            }
            return order; // If product fetch fails, return the order unchanged
          })
        );

        setOrders(detailedOrders);
      }
    };

    fetchOrdersWithDetails();
  }, [user._id, user.access_token]);

  const paidOrders = orders.filter((order) => order.payment === true);
  const unpaidOrders = orders.filter((order) => order.payment === false);
  const displayedOrders = activeTab === "paid" ? paidOrders : unpaidOrders;

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
              Đơn hàng đã thanh toán
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
            {displayedOrders.map((order) => (
              <div
                key={order.tradeId}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{order.productName}</h3>
                    <p className="text-sm text-gray-500">
                      Mã đơn: {order.tradeId}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-bold">
                    {/* {order.balence.toLocaleString("vi-VN")}đ */}
                  </p>
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
                  src={selectedOrder.image}
                  alt={selectedOrder.productName}
                  className="w-32 h-32 object-cover rounded-md mx-auto"
                />
                <p>
                  <strong>Thương hiệu:</strong> {selectedOrder.brand}
                </p>
                {/* <p>
                  <strong>Danh mục:</strong> {selectedOrder.cate}
                </p> */}
                <p>
                  <strong>Loại sản phẩm:</strong> {selectedOrder.classify}
                </p>
                <p>
                  <strong>Giá:</strong>{" "}
                  {selectedOrder.price.toLocaleString("vi-VN")}
                </p>
                <p>
                  <strong>Địa chỉ giao hàng:</strong>{" "}
                  {selectedOrder.buyersaddress}
                </p>
                <p>
                  <strong>Tên người nhận:</strong> {selectedOrder.buyersname}
                </p>
                <p>
                  <strong>Số điện thoại người nhận:</strong>{" "}
                  {selectedOrder.phoneContact}
                </p>

                <p>
                  <strong>Số lượng:</strong>{" "}
                  {selectedOrder.products[0].numberProduct}
                </p>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  {selectedOrder.balence.toLocaleString("vi-VN")}
                </p>
                <p>
                  <strong>Ngày đặt hàng:</strong> {selectedOrder.dateTrade}
                </p>
                <p>
                  <strong>Phương thức thanh toán: </strong>{" "}
                  {selectedOrder.paymentMethod}
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
