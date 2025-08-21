import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSimilarMovies } from "../utils/movieSlice";
import { options } from "../utils/constant";
import { addTVSimilar } from "../utils/tvSlice";

const useSimilarMedia = (mediaType, mediaId) => {
  const dispatch = useDispatch();

  const getSimilarMedia = async () => {
    if (!mediaType || !mediaId) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/similar?language=en-US&page=1`,
      options
    );

    const data = await response.json();
    if (mediaType === "movie") {
      dispatch(addSimilarMovies(data));
    } else if (mediaType === "tv") {
      dispatch(addTVSimilar(data));
    }
  };

  useEffect(() => {
    getSimilarMedia();
  }, [mediaType, mediaId]);
};

export default useSimilarMedia;
