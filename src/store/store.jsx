// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataSlice from "./dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataSlice,
  },
});

export default store;
