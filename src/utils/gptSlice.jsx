import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptButton: false,
    geminiButton: false,
    resultsName: null,
    geminiResults: null,
    query: "",
  },
  reducers: {
    showGPTPage: (state) => {
      state.gptButton = true;
    },
    hideGPTPage: (state) => {
      state.gptButton = false;
      state.resultsName = null;
      state.geminiResults = null;
    },
    showGeminiSearch: (state) => {
      state.geminiButton = true;
    },
    hideGeminiSearch: (state) => {
      state.geminiButton = false;
      state.resultsName = null;
      state.geminiResults = null;
    },
    addGeminiResults: (state, action) => {
      if (action.payload) {
        const { resultsName, geminiResults } = action.payload;
        state.resultsName = resultsName;
        state.geminiResults = geminiResults;
      }
    },
    clearGeminiResults: (state) => {
      state.resultsName = null;
      state.geminiResults = null;
      state.query = "";
    },
  },
});

export const {
  showGPTPage,
  hideGPTPage,
  showGeminiSearch,
  hideGeminiSearch,
  addGeminiResults,
  clearGeminiResults,
} = gptSlice.actions;
export default gptSlice.reducer;
