import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addPopularActors } from "../utils/tvSlice";

const usePopularActors = () => {
  const dispatch = useDispatch();
  const getPopularActors = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=1`,
      options
    );
    const json = await data.json();

    dispatch(addPopularActors(json?.results));
  };
  useEffect(() => {
    getPopularActors();
  }, []);
};

export default usePopularActors;
