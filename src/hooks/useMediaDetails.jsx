import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieDetails } from "../utils/movieSlice";
import { addTVDetails } from "../utils/tvSlice";
import { options } from "../utils/constant";

const useMediaDetails = (mediaType, mediaId) => {
  const dispatch = useDispatch();

  const getMediaDetails = async () => {
    if (!mediaType || !mediaId) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`,
      options
    );

    const data = await response.json();

    if (mediaType === "movie") {
      dispatch(addMovieDetails(data));
    } else if (mediaType === "tv") {
      dispatch(addTVDetails(data));
    }
  };

  useEffect(() => {
    getMediaDetails();
  }, [mediaType, mediaId]);
};

export default useMediaDetails;
