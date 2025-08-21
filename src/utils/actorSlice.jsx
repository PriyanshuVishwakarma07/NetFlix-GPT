import { createSlice } from "@reduxjs/toolkit";

const actorSlice = createSlice({
  name: "actors",
  initialState: {
    actorDetails: null,
    actorMovies: null,
    actorTVs: null,
    actorImages: null,
  },
  reducers: {
    addActorDetails: (state, action) => {
      state.actorDetails = action.payload;
    },
    addActorMovies: (state, action) => {
      state.actorMovies = action.payload;
    },
    addActorTVs: (state, action) => {
      state.actorTVs = action.payload;
    },
    addActorImages: (state, action) => {
      state.actorImages = action.payload;
    },
  },
});

export const { addActorDetails, addActorMovies, addActorTVs, addActorImages } =
  actorSlice.actions;
export default actorSlice.reducer;
