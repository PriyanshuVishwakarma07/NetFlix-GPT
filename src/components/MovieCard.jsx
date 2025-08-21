import React from "react";
import { TMDB_IMG_URL } from "../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ poster, id }) => {
  const filter = useSelector((store) => store.filter);
  const navigate = useNavigate();
  return (
    <div>
      {poster && (
        <div
          className="relative min-w-28 max-w-28 sm:min-w-46 sm:max-w-46 cursor-pointer"
          onClick={() => {
            navigate(`/watch?v=${id}&type=movie`);
          }}
        >
          <img
            src={TMDB_IMG_URL + poster}
            alt="poster"
            className="shadow-lg w-full min-28 max-w-28 sm:min-46 sm:max-w-46 "
          />
        </div>
      )}
    </div>
  );
};

export default MovieCard;