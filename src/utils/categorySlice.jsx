import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: "Details",
  reducers: {
    addCategory: (state, action) => action.payload,
  },
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;
