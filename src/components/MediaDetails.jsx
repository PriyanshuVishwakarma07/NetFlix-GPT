import React from "react";
import { useSelector } from "react-redux";
import {
  formatRuntime,
  getYearFromDate,
  formatCurrency,
} from "../utils/helper";

const MediaDetails = ({ mediaType = "movie" }) => {
  const mediaDetails = useSelector((store) =>
    mediaType === "movie" ? store.movie.movieDetails : store.tv.tvDetails
  );

  if (!mediaDetails)
    return (
      <div className="text-white text-center py-10">
        Loading {mediaType === "movie" ? "movie" : "TV show"} details...
      </div>
    );

  // Common fields
  const {
    title,
    backdrop_path,
    genres,
    overview,
    vote_average,
    production_companies,
    spoken_languages,
    tagline,
    original_language,
  } = mediaDetails;

  // Media-specific fields
  const releaseDate =
    mediaType === "movie"
      ? mediaDetails.release_date
      : mediaDetails.first_air_date;
  const runtime =
    mediaType === "movie"
      ? mediaDetails.runtime
      : mediaDetails.episode_run_time?.[0];
  const status =
    mediaType === "movie"
      ? mediaDetails.status
      : `${mediaDetails.status} (${mediaDetails.number_of_seasons} seasons)`;
  const name = mediaType === "movie" ? title : mediaDetails.name;
  const creators = mediaType === "tv" && mediaDetails.created_by;

  return (
    <div className="text-white bg-white/10 p-6 rounded-lg">
      <div>
        <h1 className="md:text-4xl text-2xl font-bold mb-2">{name}</h1>
        {tagline && (
          <p className="md:text-xl text-[16px] italic text-gray-300 mb-4">
            "{tagline}"
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h2 className="md:text-2xl text-[20px] font-bold mb-4">
                Overview
              </h2>
              <p className="md:text-lg text-[16px]">{overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Details</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Status:</span> {status}
                  </li>
                  <li>
                    <span className="font-medium">
                      {mediaType === "movie"
                        ? "Release Year"
                        : "First Air Year"}
                      :
                    </span>{" "}
                    {getYearFromDate(releaseDate)}
                  </li>
                  {runtime && (
                    <li>
                      <span className="font-medium">
                        {mediaType === "movie" ? "Runtime" : "Episode Runtime"}:
                      </span>{" "}
                      {formatRuntime(runtime)}
                    </li>
                  )}
                  <li>
                    <span className="font-medium">Original Language:</span>{" "}
                    {original_language.toUpperCase()}
                  </li>
                  <li>
                    <span className="font-medium">Rating:</span>{" "}
                    {vote_average.toFixed(1)}/10
                  </li>
                  {mediaType === "tv" && creators && (
                    <li>
                      <span className="font-medium">Created By:</span>{" "}
                      {creators.map((creator) => creator.name).join(", ")}
                    </li>
                  )}
                </ul>
              </div>

              {mediaType === "movie" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Financials</h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">Budget:</span>{" "}
                      {formatCurrency(mediaDetails.budget)}
                    </li>
                    <li>
                      <span className="font-medium">Revenue:</span>{" "}
                      {formatCurrency(mediaDetails.revenue)}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-white/80 text-black rounded-[3px] font-bold"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Spoken Languages</h3>
              <div className="flex flex-wrap gap-2">
                {spoken_languages.map((lang) => (
                  <span
                    key={lang.iso_639_1}
                    className="px-3 py-1 bg-white/80 text-black rounded-[3px] font-bold"
                  >
                    {lang.english_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;