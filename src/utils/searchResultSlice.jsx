import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    people: [], // For person results
    media: [],
    query: "",
  },
  reducers: {
    addSearchResult: (state, action) => {
      state.people = action.payload.filter(
        (item) => item.media_type === "person"
      );
      state.media = action.payload.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },

    clearResults: (state) => {
      state.people = [];
      state.media = [];
      state.query = "";
    },
  },
});

export const { addSearchResult, setSearchQuery, clearResults } =
  searchResultSlice.actions;

export default searchResultSlice.reducer;
