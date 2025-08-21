import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieCredits } from "../utils/movieSlice";
import { options } from "../utils/constant";
import { addTVCredits } from "../utils/tvSlice";

const useMediaCredits = (mediaType, mediaId) => {
  const dispatch = useDispatch();

  const getMediaCredits = async () => {
    if (!mediaType || !mediaId) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?language=en-US`,
      options
    );

    const data = await response.json();
    if (mediaType === "movie") {
      dispatch(addMovieCredits(data));
    } else if (mediaType === "tv") {
      dispatch(addTVCredits(data));
    }
  };

  useEffect(() => {
    getMediaCredits();
  }, [mediaType, mediaId]);
};

export default useMediaCredits;
