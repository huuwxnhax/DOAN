import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerAPI, loginAPI } from "../api/authAPI";

export const register = createAsyncThunk(
  "users/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await registerAPI(formData);
      console.log("Response:", data);
      return data;
    } catch (error) {
      console.error("Thunk Error:", error.response?.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await loginAPI(formData);
      console.log("Response:", data);
      return data;
    } catch (error) {
      console.error("Thunk Error:", error.response?.data);
      return rejectWithValue(error.response.data);
    }
  }
);
