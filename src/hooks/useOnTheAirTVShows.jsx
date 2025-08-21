import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addOnTheAirTVShows } from "../utils/tvSlice";

const useOnTheAirTVShows = () => {
  const dispatch = useDispatch();
  const getOnTheAirTVShows = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`,
      options
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addOnTheAirTVShows(json.results));
  };
  useEffect(() => {
    getOnTheAirTVShows();
  }, []);
};

export default useOnTheAirTVShows;
