import React, { useEffect } from "react";
import { useState } from "react";
import prod1 from "../../assets/images/prod1.webp";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, Pagination, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ProductSection = ({ isHomepage, products }) => {
  const [rating, setRating] = useState(4);

  const getPrice = (classifies) => {
    if (classifies.length === 0) return 0;
    return Math.max(...classifies.map((classify) => classify.price));
  };

  return (
    <>
      <div className="">{/* <h3 className="h3-title"></h3> */}</div>
      <div className="product-container">
        {products?.map((product) => (
          <RouterLink
            className="product-link"
            to={`/product/${product._id}`}
            state={{ product }}
            key={product._id}
          >
            <div className="product-item">
              <img src={prod1} alt="Product 1" />
              <div className="product-detail">
                <p className="product-name">{product.productName}</p>
                <div className="product-rating">
                  <Rating
                    name="read-only"
                    size="small"
                    value={rating}
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    4.0 (23)
                  </Typography>
                </div>
                <div className="product-price">
                  <span className="text-secondary">
                    {getPrice(product.classifies)}
                  </span>
                  <span>Đã bán {product.selled}</span>
                </div>
                <button className="add-to-cart-btn">
                  <AddShoppingCartIcon />
                </button>
              </div>
            </div>
          </RouterLink>
        ))}
      </div>
      {isHomepage ? (
        <div className="view-more">
          <Link
            className="btn-view-more"
            color="ivory"
            underline="none"
            href="/products"
          >
            Xem Thêm
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductSection;
