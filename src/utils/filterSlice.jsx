import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "Home",
  reducers: {
    addFilter: (state, action) => action.payload,
  },
});

export const { addFilter } = filterSlice.actions;

export default filterSlice.reducer;
