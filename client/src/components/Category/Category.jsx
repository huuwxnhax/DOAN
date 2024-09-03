import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProductSection from "../Sections/ProductSection";
import {
  getClassifiesByProductId,
  getProductsByPage,
  getProductsDynamic,
} from "../../api/productAPI";
import { Pagination, Stack } from "@mui/material";
import { getAllCate } from "../../api/cateAPI";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../features/cateSlice";
import { fetchCategories } from "../../actions/cateAction";
import { useLocation, useNavigate } from "react-router-dom";

const Category = () => {
  const sortOptions = [
    { name: "Phổ biến", value: "popular", query: "popular=1" },
    { name: "Mới nhất", value: "dateUp", query: "dateUp=1" },
    { name: "Giá giảm dần", value: "priceDesc", query: "price=-1" },
    { name: "Giá tăng dần", value: "priceAsc", query: "price=1" },
  ];

  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [selectedSort, setSelectedSort] = useState(null);

  const [showMoreCate, setShowMoreCate] = useState(false);
  const [showMoreBrand, setShowMoreBrand] = useState(false);

  const [cateHeight, setCateHeight] = useState(0);
  const [brandHeight, setBrandHeight] = useState(0);

  const cateRef = useRef(null);
  const brandRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // const debounceSort = useDebounce(selectedSort, 500);

  // get products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (selectedSort || selectedBrand) {
          let query = "";
          if (selectedBrand) {
            query = `brand=${selectedBrand}`;
            console.log("Query brand", query);
          } else {
            query = `brand=`;
          }
          if (selectedSort) {
            const sortOption = sortOptions.find(
              (option) => option.value === selectedSort
            ).query;
            query += `&${sortOption}`;
            console.log("Query sort", query);
          }

          // get products by sort
          response = await getProductsDynamic(query);
          console.log(`Response data ${query}`, response.data);
        } else {
          // get all products by page
          response = await getProductsByPage(currentPage);
        }
        const data = response.data;
        console.log("Products data", data);

        const productWithClassifies = await Promise.all(
          data.map(async (product) => {
            const classifiesResponse = await getClassifiesByProductId(
              product._id
            );
            return { ...product, classifies: classifiesResponse.data };
          })
        );
        const getBrands = data.map((product) => product.brand);
        const uniqueBrands = [...new Set(getBrands)]; // filter duplicate brands
        setBrands(uniqueBrands);

        setProducts(productWithClassifies);
        setTotalPages(data.totalPages || 10);
      } catch (error) {
        console.log("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, [currentPage, selectedSort, selectedBrand]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    navigate({ search: params.toString() }, { replace: true });
  }, [currentPage, navigate, location.search]);

  // // get all categories
  // const dispatch = useDispatch();
  // const categories = useSelector(selectAllCategories);
  const categories = useSelector((state) => selectAllCategories(state));

  useEffect(() => {
    console.log("Categories: ", categories);
  }, [categories]);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  // set height for additional categories
  useEffect(() => {
    setCateHeight(showMoreCate ? cateRef.current.scrollHeight : 0);
  }, [showMoreCate]);

  // set height for additional brands
  useEffect(() => {
    setBrandHeight(showMoreBrand ? brandRef.current.scrollHeight : 0);
  }, [showMoreBrand]);

  // select option sort products
  const handleSortClick = (option) => {
    setSelectedSort(option.value);
  };

  // select brand to filter products
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    console.log("Selected brand", brand);
  };

  // show more categories
  const handleShowMoreCate = () => {
    setShowMoreCate(!showMoreCate);
  };

  // show more brands
  const handleShowMoreBrand = () => {
    setShowMoreBrand(!showMoreBrand);
  };

  // handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="category">
      <div className="category-left">
        {/* Category filter */}
        <div className="category-filter">
          <h5 className="category__filter-title">Danh mục sản phẩm</h5>
          <ul className="category__filter-list">
            {categories.slice(0, 5).map((category) => (
              <li className="category__filter-item" key={category._id}>
                <a href="#category" className="category__filter-link">
                  {category.categoriesName}
                </a>
              </li>
            ))}
            <div
              ref={cateRef}
              className="additional-categories"
              style={{
                maxHeight: `${cateHeight}px`,
                overflow: "hidden",
                transition: "max-height 0.5s ease",
              }}
            >
              {categories.slice(5).map((category) => (
                <li className="category__filter-item" key={category._id}>
                  <a href="#category" className="category__filter-link">
                    {category.categoriesName}
                  </a>
                </li>
              ))}
            </div>
            <li className="category__filter-item">
              <p
                className="category__filter-link"
                onClick={handleShowMoreCate}
                style={{ cursor: "pointer", color: "#ff5722" }}
              >
                {showMoreCate ? "Thu gọn" : "Xem thêm"}
              </p>
            </li>
          </ul>
        </div>

        {/* Brand filter */}
        <div className="category__filter">
          <h5 className="category__filter-title">Thương hiệu</h5>
          <ul className="category__filter-list">
            {brands.slice(0, 5).map((brand) => (
              <li className="category__filter-item" key={brand}>
                <a
                  onClick={() => handleBrandClick(brand)}
                  className={`category__filter-link ${
                    selectedBrand === brand ? "active" : ""
                  }`}
                >
                  {brand}
                </a>
              </li>
            ))}
            <div
              ref={brandRef}
              className="additional-brands"
              style={{
                maxHeight: `${brandHeight}px`,
                overflow: "hidden",
                transition: "max-height 0.5s ease",
              }}
            >
              {brands.slice(5).map((brand) => (
                <li className="category__filter-item" key={brand}>
                  <a href="#brand" className="category__filter-link">
                    {brand}
                  </a>
                </li>
              ))}
            </div>
            <li className="category__filter-item">
              <p
                className="category__filter-link"
                onClick={handleShowMoreBrand}
                style={{ cursor: "pointer", color: "#ff5722" }}
              >
                {showMoreBrand ? "Thu gọn" : "Xem thêm"}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="category-right">
        <div className="product-sort">
          {/* <h5>Sắp xếp theo</h5> */}
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortClick(option)}
              className={`sort-btn ${
                selectedSort === option.value ? "active" : ""
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
        <div className="product-list">
          <ProductSection products={products} />
        </div>
        <div className="page-selection">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  // color: "#8bc34a",
                  "&.Mui-selected": {
                    color: "white",
                    backgroundColor: "#8bc34a",
                  },
                },
              }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Category;
