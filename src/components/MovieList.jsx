import React from "react";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  if (!movies) return;
  return (
    <div className="py-1 sm:py-2.5 ">
      <div className="flex-col">
        {title && (
          <p className="font-bold py-1 sm:py-2 text-lg sm:text-[22px]">
            {title}
          </p>
        )}
        <div className="flex gap-4 sm:gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden ">
          {movies?.map((movie) => (
            <MovieCard
              key={movie?.id}
              id={movie?.id}
              poster={movie?.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;