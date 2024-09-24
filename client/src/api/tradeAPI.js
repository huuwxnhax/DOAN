import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const addTradeAPI = (trade, token) =>
  API.post("/trade/add", trade, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const tradePaymentAPI = (trade, token) =>
  API.post("/trade/payment", trade, {
    headers: { Authorization: `Bearer ${token}` },
  });
