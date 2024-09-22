import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

// add product
export const addProductAPI = (product) => API.post("/products/add", product);

// update product
export const updateProductAPI = (product, token) =>
  API.post("/products/updateProducts", product, {
    headers: { Authorization: `Bearer ${token}` },
  });

// get product for homepage
export const getProductMainPage = () => API.get("/products/mainFage");

// get all products
export const getAllProducts = () => API.get("/products");

// get product by id
export const getProductById = (id) => API.get(`/products/findByid/${id}`);

// get product by page
export const getProductsByPage = (page) =>
  API.get(`/products/findpage/${page}`);

// find dynamic product
export const getProductsDynamic = (query) =>
  API.get(`/products/dynamicFind?${query}`);

// get product by seller for seller page
export const getProductsBySellerId = (id, page) =>
  API.get(`/products/seller/${id}/${page}`);

// upload file
export const uploadFile = (formData) => API.post("/products/files", formData);

// get classify by product id
export const getClassifiesByProductId = (id) => API.get(`/classify/${id}`);

// add classify
export const addClassifyAPI = (classify, token) =>
  API.post("/classify", classify, {
    headers: { Authorization: `Bearer ${token}` },
  });

// update classify
export const updateClassifyAPI = (classify, token) =>
  API.post("/classify/update", classify, {
    headers: { Authorization: `Bearer ${token}` },
  });
