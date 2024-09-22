import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const addAttributeAPI = (attribute, token) =>
  API.post("/attributes", attribute, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateAttributeAPI = (attribute, token) =>
  API.post("/attributes/update", attribute, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAttributeAPI = (attributeId, token) =>
  API.get(`/attributes/delete/${attributeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
