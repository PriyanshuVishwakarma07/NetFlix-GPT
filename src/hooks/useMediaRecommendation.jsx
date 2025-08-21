import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addMovieRecommendation } from "../utils/movieSlice";
import { addTVRecommendation } from "../utils/tvSlice";

const useMediaRecommendations = (mediaType, mediaId) => {
  const dispatch = useDispatch();

  const getMediaRecommendations = async () => {
    if (!mediaType || !mediaId) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?language=en-US&page=1`,
      options
    );

    const data = await response.json();
    if (mediaType === "movie") {
      dispatch(addMovieRecommendation(data));
    } else if (mediaType === "tv") {
      dispatch(addTVRecommendation(data));
    }
  };

  useEffect(() => {
    getMediaRecommendations();
  }, [mediaType, mediaId]);
};

export default useMediaRecommendations;
