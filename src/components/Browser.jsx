import React from "react";
import Header from "./Header";
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovie from "../hooks/usePopularMovie";
import useTopRatedMovie from "../hooks/useTopRatedMovie";
import useUpComingMovie from "../hooks/useUpComingMovie";
import useTVShows from "../hooks/useTVShows";
import usePopularTVShows from "../hooks/usePopularTVShows";
import useTopRatedTVShows from "../hooks/useTopRatedTVShows";
import useOnTheAirTVShows from "../hooks/useOnTheAirTVShows";
import usePopularActors from "../hooks/usePopularActors";
import { useSelector } from "react-redux";
import GPTSearchPage from "./GPTSearchPage";

const Browser = () => {
  const showGPT = useSelector((store) => store.gpt);
  useNowPlayingMovie();
  usePopularMovie();
  useTopRatedMovie();
  useUpComingMovie();

  useTVShows();
  usePopularTVShows();
  useTopRatedTVShows();
  useOnTheAirTVShows();

  usePopularActors();
  return (
    <div className="w-full h-full min-h-screen bg-black">
      <Header flag={false} app={false} />
      <div className="pt-2 sm:pt-4">
        <MainContainer />
        <SecondaryContainer />
      </div>
    </div>
  );
};

export default Browser;