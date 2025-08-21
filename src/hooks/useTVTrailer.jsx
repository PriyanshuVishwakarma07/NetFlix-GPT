import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addTVTrailer } from "../utils/tvSlice";

const useTVTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getTVTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`,
      options
    );

    const json = await data.json();

    const filterTrailer = json?.results;
    if (!filterTrailer) return null;

    const trailer = filterTrailer.length ? filterTrailer[0] : filterTrailer[1];

    dispatch(addTVTrailer(trailer));
  };

  useEffect(() => {
    if (movieId) getTVTrailer();
  }, [movieId]);
};

export default useTVTrailer;
