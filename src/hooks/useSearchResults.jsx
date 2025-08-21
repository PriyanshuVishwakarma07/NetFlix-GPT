import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addSearchResult } from "../utils/searchResultSlice";

const useSearchResults = (searchText) => {
  const dispatch = useDispatch();
  const getSearchResults = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchText}&include_adult=false&language=en-US&page=1`,
      options
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addSearchResult(json.results));
  };
  useEffect(() => {
    getSearchResults();
  }, [searchText]);
};

export default useSearchResults;
