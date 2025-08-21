import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { hidePlayTrailer } from "../utils/movieSlice";
import { useSearchParams } from "react-router-dom";

const PlayTrailer = () => {
  const playTrailer = useSelector((store) => store.movie?.playTrailer);
  const trailerVideo = useSelector((store) => store.movie?.trailerMovie);
  const tvTrailer = useSelector((store) => store.tv?.tvTrailer);
  const filter = useSelector((store) => store.filter);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("type") || "movie";

  // Determine which trailer to show
  const showMovieTrailer =
    (filter === "Home" || filter === "Movies" || mediaType === "movie") &&
    trailerVideo?.key;

  const showTVTrailer =
    (filter === "TV Shows" || mediaType === "tv") && tvTrailer?.key;

  return (
    <>
      {playTrailer && (
        <div className="fixed top-20 md:top-2 left-2 right-2 w-[96vw] sm:left-10 sm:w-[94%] md:bottom-2 bg-black border-2 border-gray-300 rounded-lg text-white z-60">
          <div className="flex justify-between mx-2 sm:mx-10 items-center">
            <p className="text-lg sm:text-3xl font-bold py-2.5">Trailer</p>
            <MdCancel
              size={24}
              className=""
              onClick={() => {
                dispatch(hidePlayTrailer());
              }}
            />
          </div>

          {showMovieTrailer && !showTVTrailer && (
            <iframe
              src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&modestbranding=1&rel=0&playlist=${trailerVideo.key}&disablekb=1&fs=0&iv_load_policy=3&version=3&enablejsapi=1`}
              className="w-full h-60 sm:h-[90%] mx-auto"
              allow="autoplay"
              onLoad={() => {
                const iframe = document.querySelector("iframe");
                iframe?.contentWindow?.postMessage(
                  '{"event":"command","func":"setLoop","args":[true]}',
                  "*"
                );
              }}
            />
          )}

          {showTVTrailer && (
            <iframe
              src={`https://www.youtube.com/embed/${tvTrailer.key}?autoplay=1&modestbranding=1&rel=0&playlist=${tvTrailer.key}&disablekb=1&fs=0&iv_load_policy=3&version=3&enablejsapi=1`}
              className="w-full h-60 sm:h-[90%] mx-auto"
              allow="autoplay"
              onLoad={() => {
                const iframe = document.querySelector("iframe");
                iframe?.contentWindow?.postMessage(
                  '{"event":"command","func":"setLoop","args":[true]}',
                  "*"
                );
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PlayTrailer;