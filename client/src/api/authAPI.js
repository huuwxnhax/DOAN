import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const loginAPI = (formData) => API.post("/users/login", formData);
export const registerAPI = (formData) => API.post("/users/register", formData);
