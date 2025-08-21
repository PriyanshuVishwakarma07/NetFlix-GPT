import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TMDB_IMG_URL } from "../utils/constant";

const TVCard = ({ poster, id }) => {
  const filter = useSelector((store) => store.filter);
  const navigate = useNavigate();
  return (
    <div>
      {poster && (
        <div
          className="relative min-w-28 max-w-28 sm:min-w-46 sm:max-w-46 cursor-pointer"
          onClick={() => {
            navigate(`/watch?v=${id}&type=tv`);
          }}
        >
          <img
            src={TMDB_IMG_URL + poster}
            alt="poster"
            className={`shadow-lg hover:shadow-xl transition-all duration-300 w-full min-28 max-w-28 sm:min-46 sm:max-w-46`}
          />
        </div>
      )}
    </div>
  );
};

export default TVCard;