import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const addProductAPI = (product) => API.post("/products/add", product);
export const getProductMainPage = () => API.get("/products/mainFage");
export const getAllProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/findByid/${id}`);
export const getProductsByPage = (page) =>
  API.get(`/products/findpage/${page}`);
export const getClassifiesByProductId = (id) => API.get(`/classify/${id}`);
export const addClassifyAPI = (classify) => API.post("/classify", classify);
export const getProductsDynamic = (query) =>
  API.get(`/products/dynamicFind?${query}`);

export const uploadFile = (formData) => API.post("/products/files", formData);
