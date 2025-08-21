import React, { useState } from "react";
import PlayTrailer from "./PlayTrailer";
import { useDispatch, useSelector } from "react-redux";
import { showPlayTrailer } from "../utils/movieSlice";
import { formatRuntime, getYearFromDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({
  title,
  overview,
  movieId,
  flag,
  duration,
  release,
  lang,
  genres,
  mediaId,
}) => {
  const playTrailer = useSelector((store) => store.movie?.playTrailer);
  const dispatch = useDispatch();
  const filter = useSelector((store) => store.filter);
  const navigate = useNavigate();
  return (
    <div>
      {/* Mobile: relative, small text, above poster; Desktop: absolute, large text, over video */}
      <div
        className={`z-20 ${
          // Desktop: absolute positioning
          "hidden lg:block absolute left-0 my-20 mx-10 " +
          (genres ? "top-24" : "top-46")
        }`}
      >
        {/* Desktop content */}
        {genres && (
          <div className="flex gap-4 mb-1.5">
            {genres.map((genre) => (
              <p key={genre.id} className="text-white font-semibold underline ">
                {genre?.name}
              </p>
            ))}
          </div>
        )}
        <p className="text-[32px] font-bold mb-2 text-white">{title}</p>
        <p className="max-w-[350px] text-sm font-semibold mb-2 text-gray-500 line-clamp-4 overflow-hidden text-ellipsis">
          {overview}
        </p>
        {duration && (
          <div className="flex gap-2 items-center mb-3">
            {getYearFromDate(release) === "2025" && (
              <p className="bg-white/90 text-black py-1 px-2.5  text-[12px] font-semibold rounded-[3px]">
                New
              </p>
            )}
            <p className="py-1 px-2 rounded-[3px] bg-white/20 text-white text-[12px] font-semibold">
              {formatRuntime(duration)}
            </p>
            <p className="py-1 px-2 rounded-[3px] bg-white/20 text-white text-[12px] font-semibold">
              {getYearFromDate(release)}
            </p>
            <p className="py-1 px-2 rounded-[3px] bg-white/20 text-white text-[12px] font-semibold">
              {lang[0]?.english_name}
            </p>
            <p className="py-1 px-2 rounded-[3px] bg-white/20 text-white text-[12px] font-semibold">
              HDR
            </p>
            <p className="py-1 px-2 rounded-[3px] bg-white/20 text-white text-[12px] font-semibold">
              UHD
            </p>
          </div>
        )}
        <button
          type="button"
          className={`py-2 cursor-pointer px-8 mr-2 bg-red-700/50 rounded-[3px] font-bold text-white ${
            duration ? "w-40" : ""
          } `}
          onClick={() => {
            dispatch(showPlayTrailer());
          }}
        >
          {duration ? "Play Trailer" : "Play"}
        </button>
        {flag && (
          <button
            type="button"
            className="py-2 cursor-pointer px-8 bg-white/30 rounded-[3px] font-bold text-white "
            onClick={() => {
              filter === "Home" || filter === "Movies"
                ? navigate(`/watch?v=${mediaId}&type=movie`)
                : navigate(`/watch?v=${mediaId}&type=tv`);
            }}
          >
            More Info
          </button>
        )}
      </div>
      {/* Mobile: relative, small text, above poster */}
      <div className="block lg:hidden absolute top-80 z-20 w-full px-4 pt-4 pb-2 text-center -mb-8">
        {genres && (
          <div className="flex flex-wrap gap-2 justify-center mb-1.5">
            {genres.map((genre) => (
              <p
                key={genre.id}
                className="text-white text-xs font-semibold underline "
              >
                {genre?.name}
              </p>
            ))}
          </div>
        )}
        <p className="text-[20px] font-bold md:mb-1 text-white">{title}</p>
        <p className="max-w-10/12 text-sm font-semibold mb-1 text-gray-400 line-clamp-3 overflow-hidden text-ellipsis mx-auto">
          {overview}
        </p>
        {duration && (
          <div className="flex flex-wrap gap-1 items-center justify-center mb-2">
            {getYearFromDate(release) === "2025" && (
              <p className="bg-white/90 text-black py-0.5 px-2 text-[10px] font-semibold rounded-[3px]">
                New
              </p>
            )}
            <p className="py-0.5 px-2 rounded-[3px] bg-white/20 text-white text-[10px] font-semibold">
              {formatRuntime(duration)}
            </p>
            <p className="py-0.5 px-2 rounded-[3px] bg-white/20 text-white text-[10px] font-semibold">
              {getYearFromDate(release)}
            </p>
            <p className="py-0.5 px-2 rounded-[3px] bg-white/20 text-white text-[10px] font-semibold">
              {lang[0]?.english_name}
            </p>
            <p className="py-0.5 px-2 rounded-[3px] bg-white/20 text-white text-[10px] font-semibold">
              HDR
            </p>
            <p className="py-0.5 px-2 rounded-[3px] bg-white/20 text-white text-[10px] font-semibold">
              UHD
            </p>
          </div>
        )}
        <button
          type="button"
          className="py-2 px-5 mr-2 bg-red-500/60 rounded-[3px] font-bold text-white text-xs"
          onClick={() => {
            dispatch(showPlayTrailer());
          }}
        >
          {duration ? "Play Trailer" : "Play"}
        </button>
        {flag && (
          <button
            type="button"
            className="py-2 px-5 bg-white/10 rounded-[3px] font-bold text-white text-xs"
            onClick={() => {
              filter === "Home" || filter === "Movies"
                ? navigate(`/watch?v=${mediaId}&type=movie`)
                : navigate(`/watch?v=${mediaId}&type=tv`);
            }}
          >
            More Info
          </button>
        )}
      </div>
      <div>{playTrailer && <PlayTrailer movieId={movieId} />}</div>
    </div>
  );
};

export default VideoTitle;