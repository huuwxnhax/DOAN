import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const addDescriptionAPI = (description, token) =>
  API.post("/decription", description, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateDescriptionAPI = (description, token) =>
  API.post("/decription/update", description, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteDescriptionAPI = (descriptionId, token) =>
  API.get(`/decription/delete/${descriptionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
