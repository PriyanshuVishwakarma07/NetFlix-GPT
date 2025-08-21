import React, { useEffect } from "react";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addActorImages } from "../utils/actorSlice";

const useActorImages = (actorId) => {
  const dispatch = useDispatch();
  const getActorImages = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/images`,
      options
    );

    const json = await data.json();

    dispatch(addActorImages(json?.profiles));
  };
  useEffect(() => {
    getActorImages();
  }, [actorId]);
};

export default useActorImages;