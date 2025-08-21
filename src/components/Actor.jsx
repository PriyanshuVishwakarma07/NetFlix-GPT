import React from "react";
import Header from "./Header";
import { useSearchParams } from "react-router-dom";
import useActorDetails from "../hooks/useActorDetails";
import useActorImages from "../hooks/useActorImages";
import useActorMovies from "../hooks/useActorMovies";
import useActorTVs from "../hooks/useActorTVs";
import ActorDetails from "./ActorDetails";
import { useSelector } from "react-redux";
import ActorLists from "./ActorLists";
import ActorCard from "./ActorCard";
import MovieList from "./MovieList";
import TVList from "./TVList";

const Actor = () => {
  const [searchParams] = useSearchParams();
  const actorUrl = searchParams.get("a");

  useActorDetails(actorUrl);
  useActorImages(actorUrl);
  useActorMovies(actorUrl);
  useActorTVs(actorUrl);

  const actorDetails = useSelector((store) => store.actors?.actorDetails);
  const actorImages = useSelector((store) => store.actors?.actorImages);
  const actorMovies = useSelector((store) => store.actors?.actorMovies);
  const actorTVs = useSelector((store) => store.actors?.actorTVs);

  if (!actorImages) return;
  return (
    <>
      <Header flag={false} app={false} />
      <div className="mt-14 md:mx-10 mx-3 w-[93%] md:rounded-lg rounded-[5px]  text-white">
        <div className=" bg-white/10">
          <ActorDetails actor={actorDetails} />
        </div>
        <div className="w-[96%] mx-2 mt-4 md:mx-6">
          <p className="font-black md:text-2xl text-[20px]   mb-1 md:mb-3">
            Images
          </p>
          <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {actorImages.map((image) => (
              <ActorCard key={image?.file_path} poster={image?.file_path} />
            ))}
          </div>
        </div>
        <div className="mx-2 md:mx-6">
          <MovieList title="Movies" movies={actorMovies} />
        </div>
        <div className="mx-2 md:mx-6 md:mb-0 mb-14">
          <TVList title="TV Shows" tvShows={actorTVs} />
        </div>
      </div>
    </>
  );
};

export default Actor;