import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    tvShows: null,
    popularTV: null,
    topRatedTV: null,
    onTheAirTV: null,
    popularActor: null,
    tvTrailer: null,
    tvDetails: null,
    tvCredits: null,
    tvRecommendation: null,
    tvSimilar: null,
  },
  reducers: {
    addTVShows: (state, action) => {
      state.tvShows = action.payload;
    },
    addPopularTVShows: (state, action) => {
      state.popularTV = action.payload;
    },

    addTopRatedTVShows: (state, action) => {
      state.topRatedTV = action.payload;
    },
    addOnTheAirTVShows: (state, action) => {
      state.onTheAirTV = action.payload;
    },
    addPopularActors: (state, action) => {
      state.popularActor = action.payload;
    },
    addTVDetails: (state, action) => {
      state.tvDetails = action.payload;
    },
    addTVCredits: (state, action) => {
      state.tvCredits = action.payload;
    },
    addTVRecommendation: (state, action) => {
      state.tvRecommendation = action.payload;
    },
    addTVSimilar: (state, action) => {
      state.tvSimilar = action.payload;
    },
    addTVTrailer: (state, action) => {
      state.tvTrailer = action.payload;
    },
  },
});

export const {
  addTVShows,
  addPopularTVShows,
  addTopRatedTVShows,
  addOnTheAirTVShows,
  addPopularActors,
  addTVTrailer,
  addTVDetails,
  addTVCredits,
  addTVRecommendation,
  addTVSimilar,
} = tvSlice.actions;
export default tvSlice.reducer;
