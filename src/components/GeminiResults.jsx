import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import TVCard from "./TVCards";
import ActorCard from "./ActorCard";

const GeminiResults = () => {
  const { geminiResults, resultsName } = useSelector((store) => store.gpt);

  if (!geminiResults)
    return (
      <div className="absolute md:left-[38%] left-14 top-[30%]  md:text-3xl text-3xl font-bold">
        What's on your mind?
      </div>
    );

  return (
    <div className=" mx-2 md:mx-10 md:px-2 md:py-2 rounded-[5px]">
      <div className="flex gap-2 sm:gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden ">
        {geminiResults.map((result) => {
          const item = result[0];
          if (!item) return null;

          switch (item?.media_type) {
            case "movie":
              return (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                />
              );
            case "tv":
              return (
                <TVCard key={item.id} id={item.id} poster={item.poster_path} />
              );
            case "person":
              return (
                <ActorCard
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  name={item.name}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default GeminiResults;