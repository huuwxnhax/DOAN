import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const addToCart = (cartItem) => API.post("/cart/add", cartItem);
export const getCartItemByBuyerId = (buyerId) => API.get(`/cart/${buyerId}`);
export const deleteCartItem = (cartDTO) => API.post(`/cart/remove`, cartDTO);
