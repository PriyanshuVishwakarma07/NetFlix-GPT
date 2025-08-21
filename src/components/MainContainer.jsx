import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  const tvs = useSelector((store) => store.tv?.topRatedTV);
  const filter = useSelector((store) => store.filter);
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("type") || "movie";

  if (!movies || !tvs) return null;

  const mainMovie = movies[0];
  const mainHome = movies[1];
  const mainTV = tvs[2];

  return (
    <div className="">
      {filter === "Home" && (
        <div className="overflow-x-hidden">
          <VideoBackground
            mediaId={mainHome?.id}
            image={mainHome?.backdrop_path}
            mediaType={mediaType}
            poster={mainHome?.poster_path}
          />
          <VideoTitle
            mediaId={mainHome?.id}
            title={mainHome?.original_title}
            overview={mainHome?.overview}
            flag={true}
            mediaType={mediaType}
          />
        </div>
      )}
      {filter === "Movies" && (
        <div className="overflow-x-hidden">
          <VideoBackground
            mediaId={mainMovie?.id}
            image={mainMovie?.backdrop_path}
            mediaType={mediaType}
            poster={mainMovie?.poster_path}
          />
          <VideoTitle
            title={mainMovie?.original_title}
            mediaId={mainMovie?.id}
            overview={mainMovie?.overview}
            flag={true}
            mediaType={mediaType}
          />
        </div>
      )}
      {filter === "TV Shows" && (
        <div className="overflow-x-hidden">
          <VideoBackground
            mediaId={mainTV?.id}
            image={mainTV?.backdrop_path}
            mediaType="tv"
            poster={mainTV?.poster_path}
          />
          <VideoTitle
            mediaId={mainTV?.id}
            title={mainTV?.original_name}
            overview={mainTV?.overview}
            flag={true}
            mediaType={mediaType}
          />
        </div>
      )}
    </div>
  );
};

export default MainContainer;