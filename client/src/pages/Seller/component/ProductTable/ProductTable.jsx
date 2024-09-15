import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ProductTable = () => {
  // Columns hiện tại
  const [columns, setColumns] = useState([
    { name: "ProductID", visible: true },
    { name: "Name", visible: true },
    { name: "Category", visible: true },
    { name: "Brand", visible: true },
    { name: "Image", visible: true },
    { name: "Dateup", visible: true },
    { name: "Attribute", visible: false },
    { name: "Classify", visible: false },
    { name: "Price", visible: false },
    { name: "Stock", visible: false },
  ]);

  // Toggle visibility of columns
  const toggleColumnVisibility = (name) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.name === name ? { ...col, visible: !col.visible } : col
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex-1">
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>

      {/* Toggle columns */}
      <div className="mb-4">
        <h2 className="font-bold mb-2">Customize Columns</h2>
        {columns.map((col) => (
          <label key={col.name} className="mr-10">
            <input
              type="checkbox"
              checked={col.visible}
              onChange={() => toggleColumnVisibility(col.name)}
            />
            <span className="ml-2">{col.name}</span>
          </label>
        ))}
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2"></th>
              {columns.map(
                (col) =>
                  col.visible && (
                    <th key={col.name} className="py-2 px-4 border">
                      {col.name}
                    </th>
                  )
              )}
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Dữ liệu sản phẩm, ví dụ */}
            <tr>
              <td className="py-2 px-4 border">
                <input type="checkbox" />
              </td>
              {columns.map(
                (col) =>
                  col.visible && (
                    <td key={col.name} className="py-2 px-4 border">
                      Example Data
                    </td>
                  )
              )}
              <td className="py-2 px-4 border">
                <button className="bg-blue-500 text-white p-1 rounded">
                  <EditOutlinedIcon />
                </button>
                <button className="bg-red-500 text-white p-1 rounded ml-2">
                  <DeleteOutlineOutlinedIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
