import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addPopularTVShows } from "../utils/tvSlice";

const usePopularTVShows = () => {
  const dispatch = useDispatch();
  const getPopularTVShows = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`,
      options
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addPopularTVShows(json.results));
  };
  useEffect(() => {
    getPopularTVShows();
  }, []);
};

export default usePopularTVShows;
