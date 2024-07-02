// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the auth slice
const initialState = {
  loading: false,
  status: "idle",
  error: null,
  user: null,
};

// Create an async thunk for login
export const login = createAsyncThunk(
  "/token",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://q6kl44pw2c.execute-api.us-east-1.amazonaws.com/token",
        {
          username,
          password,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user_tokens", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const loginLoading = (state) => state.auth.loading;

export default authSlice.reducer;
