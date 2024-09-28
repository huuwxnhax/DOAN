import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const loginAPI = (formData) => API.post("/users/login", formData);
export const registerAPI = (formData) => API.post("/users/register", formData);
export const updateUserAPI = (formData, token) => {
  return API.post("/users/update", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserAPI = (id, token) => {
  return API.get(`/users/profile/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendOTP = (user) => API.post("/users/sendOTP", user);
