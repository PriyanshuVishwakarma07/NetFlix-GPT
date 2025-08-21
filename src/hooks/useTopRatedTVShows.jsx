import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTopRatedTVShows } from "../utils/tvSlice";

const useTopRatedTVShows = () => {
  const dispatch = useDispatch();
  const getTopRatedTVShows = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`,
      options
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRatedTVShows(json.results));
  };
  useEffect(() => {
    getTopRatedTVShows();
  }, []);
};

export default useTopRatedTVShows;
