import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addActorMovies } from "../utils/actorSlice";

const useActorMovies = (actorId) => {
  const dispatch = useDispatch();
  const getActorMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`,
      options
    );

    const json = await data.json();
    dispatch(addActorMovies(json?.cast));
  };
  useEffect(() => {
    getActorMovies();
  }, [actorId]);
};

export default useActorMovies;
