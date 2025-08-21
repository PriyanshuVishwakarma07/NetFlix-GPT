import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaDetails from "./MediaDetails";
import { addCategory } from "../utils/categorySlice";
import ActorLists from "./ActorLists";
import MovieList from "./MovieList";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import useMediaDetails from "../hooks/useMediaDetails";
import useMediaRecommendations from "../hooks/useMediaRecommendation";
import useSimilarMedia from "../hooks/useSimilarMedia";
import useMediaCredits from "../hooks/useMediaCredits";
import TVList from "./TVList";

const WatchMedia = ({ mediaId, mediaType = "movie" }) => {
  const dispatch = useDispatch();
  const categorySelected = useSelector((store) => store.category);

  // Fetch all media data
  useMediaDetails(mediaType, mediaId);
  useMediaCredits(mediaType, mediaId);
  useMediaRecommendations(mediaType, mediaId);
  useSimilarMedia(mediaType, mediaId);

  // Select data based on media type
  const details = useSelector((store) =>
    mediaType === "movie" ? store.movie.movieDetails : store.tv.tvDetails
  );
  const casts = useSelector((store) =>
    mediaType === "movie"
      ? store.movie.movieCredits?.cast
      : store.tv.tvCredits?.cast
  );
  const recommendations = useSelector((store) =>
    mediaType === "movie"
      ? store.movie.movieRecommendation?.results
      : store.tv.tvRecommendation?.results
  );
  const similar = useSelector((store) =>
    mediaType === "movie"
      ? store.movie.similarMovies?.results
      : store.tv.tvSimilar?.results
  );

  const watchCategories = ["Details", "Cast", "Similar", "Recommendation"];

  if (!details)
    return (
      <div className="text-white text-center py-20">
        Loading {mediaType === "movie" ? "movie" : "TV show"} details...
      </div>
    );

  const {
    title,
    name,
    backdrop_path,
    release_date,
    first_air_date,
    runtime,
    episode_run_time,
    spoken_languages,
    genres,
    overview,
    id,
  } = details;

  return (
    <>
      <div className="mt-6 md:mt-6">
        <VideoBackground
          mediaId={id}
          image={backdrop_path}
          mediaType={mediaType}
        />
        <VideoTitle
          flag={false}
          title={mediaType === "movie" ? title : name}
          overview={overview}
          duration={mediaType === "movie" ? runtime : episode_run_time?.[0]}
          release={mediaType === "movie" ? release_date : first_air_date}
          lang={spoken_languages}
          genres={genres}
        />
      </div>
      <div className="absolute z-50 top-[65%] md:top-[90%] left-4 md:left-10 md:right-10 right-4  text-white">
        <div className="flex md:gap-8 gap-5 md:mb-2  mb-0">
          {watchCategories.map((category) => (
            <button
              key={category}
              className={`text-[14px] md:text-xl font-bold whitespace-nowrap ${
                categorySelected === category
                  ? "text-white border-b-2 border-red-600"
                  : "text-white/50 hover:text-white"
              }`}
              onClick={() => dispatch(addCategory(category))}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-4 mb-14 md:mb-0">
          {categorySelected === "Details" && (
            <MediaDetails mediaType={mediaType} />
          )}

          {categorySelected === "Cast" && casts && (
            <ActorLists title="Cast" actors={casts} />
          )}

          {categorySelected === "Similar" &&
            similar &&
            (similar[0]?.media_type === "movie" || mediaType === "movie" ? (
              <MovieList
                title={`Similar ${
                  mediaType === "movie" ? "Movies" : "TV Shows"
                }`}
                movies={similar}
              />
            ) : (
              <TVList
                title={`Similar ${
                  mediaType === "movie" ? "Movies" : "TV Shows"
                }`}
                tvShows={similar}
              />
            ))}

          {categorySelected === "Recommendation" &&
            recommendations &&
            (recommendations[0]?.media_type === "movie" ||
            mediaType === "movie" ? (
              <MovieList title="Recommendations" movies={recommendations} />
            ) : (
              <TVList title="Recommendations" tvShows={recommendations} />
            ))}
        </div>
      </div>
    </>
  );
};

export default WatchMedia;