import React from "react";
import TVCard from "./TVCards";

const TVList = ({ title, tvShows }) => {
  if (!tvShows) return;
  return (
    <div className="py-1 sm:py-2.5 ">
      <div className="flex-col">
        <p className="font-bold py-1 sm:py-2 text-lg sm:text-[22px]">{title}</p>
        <div className="flex gap-4 sm:gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {tvShows?.map((tv, idx) => (
            <TVCard
              key={tv?.id + "-" + idx}
              id={tv?.id}
              poster={tv?.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVList;