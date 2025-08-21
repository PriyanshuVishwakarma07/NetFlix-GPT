import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addActorDetails } from "../utils/actorSlice";

const useActorDetails = (actorId) => {
  const dispatch = useDispatch();
  const getActorDetails = async () => {
    if (!actorId) return;

    const data = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
      options
    );

    const json = await data.json();

    dispatch(addActorDetails(json));
  };
  useEffect(() => {
    getActorDetails();
  }, [actorId]);
};

export default useActorDetails;