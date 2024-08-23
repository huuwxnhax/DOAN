import React from "react";
import { useState } from "react";
import prod1 from "../../assets/images/prod1.webp";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, Pagination, Stack } from "@mui/material";

const ProductSection = ({ isHomepage }) => {
  const [rating, setRating] = useState(4);

  return (
    <>
      <div className="">
        <h3 className="h3-title">Products</h3>
      </div>
      <div className="product-container">
        <a className="product-link" href="">
          <div className="product-item">
            <img src={prod1} alt="Product 1" />
            <div className="product-detail">
              <p className="product-name">
                Dép gia đình chống trượt EVA dép mang trong nhàaaaaaaaaaaaaaaaa
              </p>
              <div className="product-rating">
                <Rating name="read-only" size="small" value={rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                  4.0 (23)
                </Typography>
              </div>
              <div className="product-price">
                <span className="text-secondary">50.000đ</span>
                <span>Đã bán 350</span>
              </div>
              <button className="add-to-cart-btn">
                <AddShoppingCartIcon />
              </button>
            </div>
          </div>
        </a>
        <a className="product-link" href="">
          <div className="product-item">
            <img src={prod1} alt="Product 1" />
            <div className="product-detail">
              <p className="product-name">
                Dép gia đình chống trượt EVA dép mang trong nhàaaaaaaaaaaaaaaaa
              </p>
              <div className="product-rating">
                <Rating name="read-only" size="small" value={rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                  4.0 (23)
                </Typography>
              </div>
              <div className="product-price">
                <span className="text-secondary">50.000đ</span>
                <span>Đã bán 350</span>
              </div>
              <button className="add-to-cart-btn">
                <AddShoppingCartIcon />
              </button>
            </div>
          </div>
        </a>
        <a className="product-link" href="">
          <div className="product-item">
            <img src={prod1} alt="Product 1" />
            <div className="product-detail">
              <p className="product-name">
                Dép gia đình chống trượt EVA dép mang trong nhàaaaaaaaaaaaaaaaa
              </p>
              <div className="product-rating">
                <Rating name="read-only" size="small" value={rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                  4.0 (23)
                </Typography>
              </div>
              <div className="product-price">
                <span className="text-secondary">50.000đ</span>
                <span>Đã bán 350</span>
              </div>
              <button className="add-to-cart-btn">
                <AddShoppingCartIcon />
              </button>
            </div>
          </div>
        </a>
        <a className="product-link" href="">
          <div className="product-item">
            <img src={prod1} alt="Product 1" />
            <div className="product-detail">
              <p className="product-name">
                Dép gia đình chống trượt EVA dép mang trong nhàaaaaaaaaaaaaaaaa
              </p>
              <div className="product-rating">
                <Rating name="read-only" size="small" value={rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                  4.0 (23)
                </Typography>
              </div>
              <div className="product-price">
                <span className="text-secondary">50.000đ</span>
                <span>Đã bán 350</span>
              </div>
              <button className="add-to-cart-btn">
                <AddShoppingCartIcon />
              </button>
            </div>
          </div>
        </a>
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
        <div className="page-selection">
          <Stack spacing={2}>
            <Pagination
              count={10}
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
      )}
    </>
  );
};

export default ProductSection;
