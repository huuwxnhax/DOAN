import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FooterSection from "../../components/Sections/FooterSection";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import {
  addTradeAPI,
  cancelTradeAPI,
  getTradeAPI,
  tradePaymentAPI,
} from "../../api/tradeAPI";
import { useSelector } from "react-redux";
import { getProductById } from "../../api/productAPI";
import "../Orders/Orders.css";

const Orders = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("paid");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [orders, setOrders] = useState([]);
  const [paymentUrl, setPaymentUrl] = useState("");

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
                image: productData.images?.[0] || "",
                brand: productData.brand,
                category: productData.category,
                classify: classify ? classify.value : "N/A",
                price: classify ? classify.price : "N/A",
                phoneContact: user.number,
                paymentMethod:
                  order.paymentMethod == "cash"
                    ? "Thanh toán khi nhận hàng"
                    : "ZaloPay",
              };
            }
            return order;
          })
        );

        setOrders(detailedOrders);
      }
    };

    fetchOrdersWithDetails();
  }, [user._id, user.access_token]);

  const paidOrders = orders.filter(
    (order) => order.payment === true && !order.isCancel
  );
  const unpaidOrders = orders.filter(
    (order) => order.payment === false && !order.isCancel
  );
  const canceledOrders = orders.filter((order) => order.isCancel === true);

  const displayedOrders =
    activeTab === "paid"
      ? paidOrders
      : activeTab === "unpaid"
      ? unpaidOrders
      : canceledOrders;

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCancelOrder = async (tradeId) => {
    if (selectedOrder.sellerAccept === true) {
      alert("Đơn hàng đã được xác nhận, không thể huỷ");
      return;
    }

    console.log("Canceling order", tradeId);

    const formData = {
      tradeId: tradeId,
      buyer: user._id,
      seller: selectedOrder.seller,
      balence: selectedOrder.balence,
    };

    try {
      const response = await cancelTradeAPI(formData, user.access_token);
      console.log(response);
      setModalOpen(false);

      window.location.reload();
    } catch (error) {
      console.error("Failed to cancel the order:", error);
    }
  };

  const handlePurchaseOrder = async () => {
    const paymenData = {
      tradeId: [selectedOrder.tradeId],
      method: "zalo",
    };
    console.log("Adding trade:", paymenData);
    try {
      const paymentResponse = await tradePaymentAPI(
        paymenData,
        user.access_token
      );
      console.log("Payment response:", paymentResponse.data);
      setPaymentUrl(paymentResponse.data.order_url);
      const { order_url } = paymentResponse.data;
      if (order_url) {
        window.location.href = order_url;
      }
    } catch (error) {
      console.error("Error adding trade:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="order-list">
        <div className=" bg-white p-6 rounded-lg shadow-lg">
          {/* Header with Tabs (Styled like navigation bar) */}
          <div className="flex border-b-2 border-gray-300 mb-6">
            <div
              onClick={() => setActiveTab("paid")}
              className={`py-3 px-6 cursor-pointer font-bold whitespace-nowrap ${
                activeTab === "paid"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Đơn hàng đã thanh toán
            </div>
            <div
              onClick={() => setActiveTab("unpaid")}
              className={`py-3 px-6 cursor-pointer font-bold whitespace-nowrap ${
                activeTab === "unpaid"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Đơn hàng chưa thanh toán
            </div>
            <div
              onClick={() => setActiveTab("canceled")}
              className={`py-3 px-6 cursor-pointer font-bold whitespace-nowrap ${
                activeTab === "canceled"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Đơn hàng đã huỷ
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {displayedOrders.map((order) => (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
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
                    {order.sellerAccept && !order.isCancel && (
                      <p className="text-sm text-green-500 font-bold mt-1">
                        Đã chấp nhận đơn hàng
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right order-1 sm:order-2">
                  {order.isCancel && (
                    <p className="text-red-500">Đơn hàng đã huỷ</p>
                  )}
                  {!order.isCancel && <p>{order.paymentMethod}</p>}
                  <p className="font-bold">
                    {order.balence.toLocaleString("vi-VN")}đ
                  </p>
                </div>
                {/* Responsive buttons */}
                <div className="flex flex-col items-center sm:flex-row sm:justify-end sm:w-auto mt-4 sm:mt-0 order-2 sm:order-3">
                  <button
                    className="mt-2 sm:mt-0 sm:ml-4 transition duration-300"
                    onClick={() => handleOrderDetails(order)}
                  >
                    <span className="hidden sm:inline bg-blue-500 text-white py-2 px-4 rounded-lg whitespace-nowrap">
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
      <div className="order-footer">
        <FooterSection />
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chi tiết đơn hàng</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left Column: Product Information */}
                <div className="space-y-4">
                  <p>
                    <strong>Tên sản phẩm:</strong> {selectedOrder.productName}
                  </p>
                  <img
                    src={selectedOrder.image}
                    alt={selectedOrder.productName}
                    className="w-48 h-48 object-cover rounded-md mx-auto"
                  />
                  <p>
                    <strong>Thương hiệu:</strong> {selectedOrder.brand}
                  </p>
                  <p>
                    <strong>Loại sản phẩm:</strong> {selectedOrder.classify}
                  </p>
                  <p>
                    <strong>Giá:</strong>{" "}
                    {selectedOrder.price.toLocaleString("vi-VN")}đ
                  </p>
                  <p>
                    <strong>Số lượng:</strong>{" "}
                    {selectedOrder.products[0].numberProduct}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {selectedOrder.balence.toLocaleString("vi-VN")}đ
                  </p>
                  <p>
                    <strong>Ngày đặt hàng:</strong> {selectedOrder.dateTrade}
                  </p>
                </div>

                {/* Right Column: Recipient and Order Status */}
                <div className="space-y-4">
                  <p>
                    <strong>Địa chỉ giao hàng:</strong>{" "}
                    {selectedOrder.buyersaddress}
                  </p>
                  <p>
                    <strong>Tên người nhận:</strong> {selectedOrder.buyersname}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {selectedOrder.phoneContact}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.buyersuserName}
                  </p>
                  <p>
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {selectedOrder.paymentMethod === "cash"
                      ? "Thanh toán khi nhận hàng"
                      : "ZaloPay"}
                  </p>

                  {selectedOrder.isCancel && (
                    <p className="text-red-500">
                      <strong>Trạng thái:</strong> Đã huỷ
                    </p>
                  )}

                  {!selectedOrder.isCancel && (
                    <button
                      className={`bg-red-500 text-white py-2 px-4 rounded-lg w-full mt-4 ${
                        selectedOrder.sellerAccept
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handleCancelOrder(selectedOrder.tradeId)}
                    >
                      Huỷ đơn hàng
                    </button>
                  )}

                  {selectedOrder.sellerAccept && (
                    <p className="text-green-500">
                      Đơn hàng đã được chấp nhận và đang vận chuyển, không thể
                      huỷ.
                    </p>
                  )}

                  {!selectedOrder.payment &&
                    selectedOrder.paymentMethod === "zalo" &&
                    !selectedOrder.isCancel && (
                      <button
                        onClick={handlePurchaseOrder}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4"
                      >
                        Thanh toán ngay
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
