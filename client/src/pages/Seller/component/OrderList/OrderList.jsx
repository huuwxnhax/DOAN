import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { getTradeBySellerAPI } from "../../../../api/tradeAPI";
import { useSelector } from "react-redux";
const OrderList = () => {
  const user = useSelector((state) => state.auth.user);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getTradeBySellerAPI(user._id, user.access_token);
      console.log(response.data);
    };
    fetchOrders();
  }, []);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const orders = [
    {
      id: "#78522135",
      productName:
        "Smart watch with long name example for testing text overflow",
      category: "Accessories",
      address:
        "351 Sherwood Forest Drive, with long address example for testing text overflow",
      date: "05/21/2021", //mm/dd/yyyy
      price: "$376.00",
      status: "Complete",
      statusColor: "text-green-500",
      paymentMethod: "Credit Card", // Thêm phương thức thanh toán
    },
    {
      id: "#78522136",
      productName: "Headphones",
      category: "Electronics",
      address: "6391 Elgin St. Celina",
      date: "03/21/2021",
      price: "$276.00",
      status: "Pending",
      statusColor: "text-yellow-500",
      paymentMethod: "PayPal",
    },
    {
      id: "#78522137",
      productName: "Iphone Pro",
      category: "Electronics",
      address: "8502 Preston Rd. Inglewood",
      date: "01/04/2025",
      price: "$300.00",
      status: "Canceled",
      statusColor: "text-red-500",
      paymentMethod: "Cash on Delivery",
    },
  ];

  // Filter orders based on status and date range
  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      selectedStatus === "All" || order.status === selectedStatus;
    const dateMatch =
      selectedDateRange.from === "" ||
      selectedDateRange.to === "" ||
      (new Date(order.date) >= new Date(selectedDateRange.from) &&
        new Date(order.date) <= new Date(selectedDateRange.to));
    return statusMatch && dateMatch;
  });

  // Handle showing modal with order details
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Order List</h2>

      {/* Filter Section */}
      <div className="flex justify-between mb-4">
        {/* Status Filter */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedStatus === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedStatus("All")}
          >
            All orders
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedStatus === "Complete"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedStatus("Complete")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedStatus === "Pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedStatus("Pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedStatus === "Canceled"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedStatus("Canceled")}
          >
            Canceled
          </button>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label className="mr-2">From:</label>
            <input
              type="date"
              className="border border-gray-300 rounded p-2"
              value={selectedDateRange.from}
              onChange={(e) =>
                setSelectedDateRange({
                  ...selectedDateRange,
                  from: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">To:</label>
            <input
              type="date"
              className="border border-gray-300 rounded p-2"
              value={selectedDateRange.to}
              onChange={(e) =>
                setSelectedDateRange({
                  ...selectedDateRange,
                  to: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Order Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4 border-b">Order ID</th>
            <th className="p-4 border-b">Product Name</th>
            <th className="p-4 border-b">Category</th>
            <th className="p-4 border-b">Address</th>
            <th className="p-4 border-b">Date</th>
            <th className="p-4 border-b">Price</th>
            <th className="p-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td
                className="p-4 border-b cursor-pointer"
                onClick={() => handleShowDetails(order)}
              >
                {order.id}
              </td>
              <td
                className="p-4 border-b truncate max-w-xs cursor-pointer"
                onClick={() => handleShowDetails(order)}
              >
                {order.productName}
              </td>
              <td className="p-4 border-b truncate max-w-xs">
                {order.category}
              </td>
              <td className="p-4 border-b truncate max-w-xs">
                {order.address}
              </td>
              <td className="p-4 border-b">{order.date}</td>
              <td className="p-4 border-b">{order.price}</td>
              <td className={`p-4 border-b ${order.statusColor}`}>
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="order-details-modal"
          aria-describedby="order-details-description"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Order Details</h3>
                <CloseIcon
                  className="text-red-500 cursor-pointer"
                  onClick={() => setShowModal(false)}
                  size={24}
                />
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Product Name:</strong> {selectedOrder.productName}
                </p>
                <p>
                  <strong>Category:</strong> {selectedOrder.category}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrder.address}
                </p>
                <p>
                  <strong>Date:</strong> {selectedOrder.date}
                </p>
                <p>
                  <strong>Price:</strong> {selectedOrder.price}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Payment Method:</strong> {selectedOrder.paymentMethod}{" "}
                  {/* Thêm thông tin phương thức thanh toán */}
                </p>
              </div>

              {/* Accept and Reject Buttons */}
              <div className="mt-4 flex justify-end space-x-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  Accept
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderList;
