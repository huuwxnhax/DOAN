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

export const acceptTradeAPI = (trade, token) =>
  API.post("/trade/accept", trade, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const cancelTradeAPI = (trade, token) =>
  API.post("/trade/cancel", trade, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const refundTradeAPI = (trade, token) =>
  API.post("/trade/refund", trade, {
    headers: { Authorization: `Bearer ${token}` },
  });
