import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const getProductMainPage = () => API.get("/products/mainFage");
export const getAllProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/findByid/${id}`);
export const getProductsByPage = (page) =>
  API.get(`/products/findpage/${page}`);
export const getClassifiesByProductId = (id) => API.get(`/classify/${id}`);
export const getProductsDynamic = (query) =>
  API.get(`/products/dynamicFind?${query}`);
