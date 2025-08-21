import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTVShows } from "../utils/tvSlice";

const useTVShows = () => {
  const dispatch = useDispatch();
  const getTVShows = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1`,
      options
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTVShows(json.results));
  };
  useEffect(() => {
    getTVShows();
  }, []);
};

export default useTVShows;
