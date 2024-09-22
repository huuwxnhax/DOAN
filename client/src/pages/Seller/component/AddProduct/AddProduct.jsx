import { useEffect, useState } from "react";
import UploadComponent from "../../../../components/Dropzone/UploadComponent";
import ClearIcon from "@mui/icons-material/Clear";

import { useSelector } from "react-redux";
import {
  addClassifyAPI,
  addProductAPI,
  uploadFile,
} from "../../../../api/productAPI";
import { getAllCate } from "../../../../api/cateAPI";
import { addAttributeAPI } from "../../../../api/attriAPI";
import { addDescriptionAPI } from "../../../../api/descriptAPI";

const AddProduct = () => {
  const user = useSelector((state) => state.auth.user);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState([
    { key: "", value: "" },
  ]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState("");
  const [classifies, setClassifies] = useState([
    { key: "", value: "", price: 0, stock: 0 },
  ]);
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);
  const [images, setImages] = useState([]);

  // Function to add new description field
  const addDescription = () => {
    setProductDescription([...productDescription, { key: "", value: "" }]);
  };

  // Function to delete a description field
  const deleteDescription = (index) => {
    if (productDescription.length === 1) return;
    setProductDescription(productDescription.filter((_, i) => i !== index));
  };

  // Function to add a new classify field
  const addClassify = () => {
    setClassifies([...classifies, { key: "", value: "", price: 0, stock: 0 }]);
  };

  // Function to add a new attribute field
  const addAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  // Function to delete a classify field
  const deleteClassify = (index) => {
    if (classifies.length === 1) return;
    setClassifies(classifies.filter((_, i) => i !== index));
  };

  const deleteAttribute = (index) => {
    if (attributes.length === 1) return;
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  // Function to handle file drop
  const handleDrop = async (files) => {
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file);
      }
      // Call API to upload file to S3
      const response = await uploadFile(formData);
      const imageUrls = response.data;
      setImages([...images, ...imageUrls]); // Update images state
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCate();
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      // Prepare product data
      const product = {
        productName,
        brand,
        cate: category,
        seller: user._id,
        images,
      };
      // Call API to add product
      console.log(product);
      const resProduct = await addProductAPI(product);
      console.log(resProduct.data);

      // Prepare and call API to add classifies
      for (const classify of classifies) {
        const classifyData = {
          key: classify.key,
          value: classify.value,
          price: classify.price,
          stock: classify.stock,
          product: resProduct.data._id,
        };
        const resClassify = await addClassifyAPI(
          classifyData,
          user.access_token
        );
        console.log(resClassify.data);
      }

      // Prepare and call API to add attributes
      for (const attribute of attributes) {
        const attributeData = {
          key: attribute.key,
          value: attribute.value,
          productId: resProduct.data._id,
        };
        const resAttribute = await addAttributeAPI(
          attributeData,
          user.access_token
        );
        console.log(resAttribute.data);
      }

      // Prepare and call API to add descriptions
      for (const description of productDescription) {
        const descriptionData = {
          key: description.key,
          value: description.value,
          product: resProduct.data._id,
        };
        const resDescription = await addDescriptionAPI(
          descriptionData,
          user.access_token
        );
        console.log(resDescription.data);
      }

      // Reset form
      setProductName("");
      setBrand("");
      setCategory("");
      setClassifies([{ key: "", value: "", price: 0, stock: 0 }]);
      setAttributes([{ key: "", value: "" }]);
      setProductDescription([{ key: "", value: "" }]);
      setImages([]);
    } catch (error) {
      console.error("An error occurred while submitting:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Thêm Mới Sản Phẩm</h1>

      {/* Product Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Tên Sản Phẩm</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mt-2"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      {/* Category and Brand */}
      <div className="flex gap-10">
        <div className="mb-4">
          <label className="block text-gray-700">Danh Mục</label>
          <select
            className="w-full p-2 border rounded-lg mt-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cate) => (
              <option key={cate._id} value={cate._id}>
                {cate.categoriesName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Thương Hiệu</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mt-2"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
      </div>

      {/* Classify */}
      <div className="mb-4">
        <label className="block text-gray-700">Phân loại</label>
        {classifies.map((classify, index) => (
          <div key={index} className="flex space-x-4 items-center mb-4">
            <div className="w-1/4">
              {/* <label className="block text-gray-700 text-sm mb-1">Key</label> */}
              <input
                type="text"
                placeholder="Mô tả"
                className="w-full p-2 border rounded-lg"
                value={classify.key}
                onChange={(e) =>
                  setClassifies((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, key: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <div className="w-1/4">
              {/* <label className="block text-gray-700 text-sm mb-1">Value</label> */}
              <input
                type="text"
                placeholder="Nội dung"
                className="w-full p-2 border rounded-lg"
                value={classify.value}
                onChange={(e) =>
                  setClassifies((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, value: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <label className="block text-gray-700 text-sm mb-1">Giá</label>
            <div className="w-1/4">
              <input
                type="number"
                placeholder="Price"
                className="w-full p-2 border rounded-lg"
                value={classify.price}
                onChange={(e) =>
                  setClassifies((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, price: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <label className="block text-gray-700 text-sm mb-1">Số Lượng</label>
            <div className="w-1/4">
              <input
                type="number"
                placeholder="Stock"
                className="w-full p-2 border rounded-lg"
                value={classify.stock}
                onChange={(e) =>
                  setClassifies((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, stock: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <ClearIcon
              className="text-red-500 cursor-pointer"
              onClick={() => deleteClassify(index)}
            />
          </div>
        ))}
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={addClassify}
        >
          Thêm Phân Loại
        </button>
      </div>

      {/* Attributes */}
      <div className="mb-4">
        <label className="block text-gray-700">Thuộc Tính</label>
        {attributes.map((attribute, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="Mô tả"
              className="w-1/2 p-2 border rounded-lg"
              value={attribute.key}
              onChange={(e) =>
                setAttributes((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, key: e.target.value } : item
                  )
                )
              }
            />
            <input
              type="text"
              placeholder="Nội dung"
              className="w-1/2 p-2 border rounded-lg"
              value={attribute.value}
              onChange={(e) =>
                setAttributes((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, value: e.target.value } : item
                  )
                )
              }
            />
            <ClearIcon
              className="text-red-500 cursor-pointer"
              onClick={() => deleteAttribute(index)}
            />
          </div>
        ))}
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={addAttribute}
        >
          Thêm Thuộc Tính
        </button>
      </div>

      {/* Description Product */}
      <div className="mb-4">
        <label className="block text-gray-700">Mô Tả Sản Phẩm</label>
        {productDescription.map((desc, index) => (
          <div key={index} className="flex space-x-4 mb-2 items-center">
            <input
              type="text"
              placeholder="Mô tả"
              className="w-1/2 p-2 border rounded-lg"
              value={desc.key}
              onChange={(e) =>
                setProductDescription((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, key: e.target.value } : item
                  )
                )
              }
            />
            <input
              type="text"
              placeholder="Nội dung"
              className="w-1/2 p-2 border rounded-lg"
              value={desc.value}
              onChange={(e) =>
                setProductDescription((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, value: e.target.value } : item
                  )
                )
              }
            />
            <ClearIcon
              className="text-red-500 cursor-pointer"
              onClick={() => deleteDescription(index)}
            />
          </div>
        ))}
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={addDescription}
        >
          Thêm Mô Tả
        </button>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Ảnh Sản Phẩm</label>
        <UploadComponent onUpload={handleDrop} />
        {/* Preview uploaded images */}
        <div className="flex space-x-4 mt-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>
      </div>
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!images.length}
        className="mt-4 p-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
};

export default AddProduct;