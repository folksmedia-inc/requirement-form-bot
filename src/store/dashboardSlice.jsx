// dataSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  data: null,
  projectName: "", // Add projectName to state
  stepTwoData: [],
  stepThreeData: [],
  finalResult: "",
};

const baseURL = "https://q6kl44pw2c.execute-api.us-east-1.amazonaws.com";

// Define async thunk for API call
export const postData = createAsyncThunk(
  "data/postData",
  async (requestData) => {
    // Destructure projectName and requestData
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("user_tokens")
      )?.access_token;

      const response = await axios.post(`${baseURL}/submit_data`, requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });

      // Return an object with both response data and projectName
      return { data: response.data, requestData };
    } catch (error) {
      console.error("Error in postData async thunk:", error);
      throw error; // Throw the error to be caught by .rejected case
    }
  }
);

// Slice definition
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    setStepTwoData: (state, action) => {
      state.stepTwoData = action.payload;
    },
    setStepThreeData: (state, action) => {
      state.stepThreeData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Store response data
        state.projectName = action.payload.requestData.step1; // Store projectName
        if (action.payload.data.dynamic_project_questions) {
          state.stepThreeData = action.payload.data.dynamic_project_questions;
        } else if (action.payload.data.summary) {
          state.finalResult = action.payload.data.summary;
        } else {
          state.stepTwoData = action.payload.data;
        }
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to submit data.";
      });
  },
});

export const { setStepTwoData, setStepThreeData } = dataSlice.actions;
export const selectData = (state) => state.data.data; // Selector function to access stored data
export const selectProjectName = (state) => state.data.projectName; // Selector function to access stored projectName
export const selectStepTwoData = (state) => state.data.stepTwoData;
export const selectStepThreeData = (state) => state.data.stepThreeData;
export const loading = (state) => state.data.loading;
export const selectFinalResult = (state) => state.data.finalResult;

export default dataSlice.reducer;
