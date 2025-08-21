import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRated: null,
    upComingMovies: null,
    trailerMovie: null,
    playTrailer: false,
    movieDetails: null,
    movieCredits: null,
    movieRecommendation: null,
    similarMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRated = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.trailerMovie = action.payload;
    },
    addMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    addMovieCredits: (state, action) => {
      state.movieCredits = action.payload;
    },
    addMovieRecommendation: (state, action) => {
      state.movieRecommendation = action.payload;
    },
    addSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
    showPlayTrailer: (state) => {
      state.playTrailer = true;
    },
    hidePlayTrailer: (state) => {
      state.playTrailer = false;
    },
  },
});

export const {
  addNowPlayingMovies,
  addMovieTrailer,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
  showPlayTrailer,
  hidePlayTrailer,
  addMovieDetails,
  addMovieCredits,
  addMovieRecommendation,
  addSimilarMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
