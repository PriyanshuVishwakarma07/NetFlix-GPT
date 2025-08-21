import React from "react";
import ActorCard from "./ActorCard";
import { useSelector } from "react-redux";

const ActorLists = ({ title, actors }) => {
  const filter = useSelector((store) => store.filter);

  return (
    <div className="py-1 sm:py-2.5 ">
      <div>
        <p className="font-bold py-1 sm:py-2 text-lg sm:text-[22px]">{title}</p>
        <div
          className={`overflow-x-scroll [&::-webkit-scrollbar]:hidden flex gap-4 sm:gap-4`}
        >
          {actors?.map((actor) => (
            <ActorCard
              key={actor?.id}
              id={actor?.id}
              poster={actor?.profile_path}
              name={actor?.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorLists;