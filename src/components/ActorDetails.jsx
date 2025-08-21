import React, { useState } from "react";
import { FaBirthdayCake, FaMapMarkerAlt, FaFilm } from "react-icons/fa";

const ActorDetails = ({ actor }) => {
  const [showBio, setShowBio] = useState(true);
  const handleShowBio = () => {
    setShowBio(!showBio);
  };
  if (!actor) return <div className="text-white">Loading actor details...</div>;

  return (
    <div className="text-white bg-white/10 p-2 sm:p-4 md:p-6 shadow-lg ">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex-shrink-0 flex justify-center md:block">
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="w-40 h-60 sm:w-52 sm:h-80 md:w-64 md:h-96 object-cover rounded-[5px] shadow-md mx-auto md:mx-0"
            />
          ) : (
            <div className="w-40 h-60 sm:w-52 sm:h-80 md:w-64 md:h-96 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image Available</span>
            </div>
          )}
        </div>
        <div className="flex-grow mt-4 md:mt-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            {actor.name}
          </h1>

          <div className="flex items-center mb-4">
            <FaFilm className="mr-2 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">
              {actor.known_for_department}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FaBirthdayCake className="mr-2 text-gray-400" />
              <span>
                Born:{" "}
                {new Date(actor.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {actor.place_of_birth && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                <span>{actor.place_of_birth}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-1">
              Biography
            </h2>
            {actor.biography ? (
              <>
                <p
                  className={`text-gray-300 leading-relaxed  ${
                    showBio ? "line-clamp-4 " : "line-clamp-none"
                  } `}
                >
                  {actor.biography}
                </p>
                <span
                  onClick={() => {
                    handleShowBio();
                  }}
                  className="font-bold text-white cursor-pointer
                "
                >
                  .more
                </span>
              </>
            ) : (
              <p className="text-gray-500 italic">No biography available.</p>
            )}
          </div>

          {actor.deathday && (
            <div className="flex items-center text-red-400">
              <span>
                Passed away:{" "}
                {new Date(actor.deathday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;