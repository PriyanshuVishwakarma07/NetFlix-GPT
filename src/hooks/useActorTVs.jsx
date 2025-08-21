import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addActorTVs } from "../utils/actorSlice";

const useActorTVs = (actorId) => {
  const dispatch = useDispatch();
  const getActorTVs = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/tv_credits?language=en-US`,
      options
    );

    const json = await data.json();
    dispatch(addActorTVs(json?.cast));
  };

  useEffect(() => {
    getActorTVs();
  }, [actorId]);
};

export default useActorTVs;
