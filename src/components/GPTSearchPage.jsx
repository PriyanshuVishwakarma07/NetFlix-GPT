import React, { useRef, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import useSearchResults from "../hooks/useSearchResults";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import ActorCard from "./ActorCard";
import TVCard from "./TVCards";
import Header from "./Header";
import { GoogleGenAI } from "@google/genai";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { options } from "../utils/constant";
import { addGeminiResults } from "../utils/gptSlice";
import GeminiResults from "./GeminiResults";

const GPTSearchPage = () => {
  const searchText = useRef();

  const { people, media } = useSelector((state) => state.searchResult);
  const [searchQuery, setSearchQuery] = useState("");
  const { geminiButton, geminiResults } = useSelector((store) => store.gpt);
  const dispatch = useDispatch();
  const handleGptSearchClick = () => {
    const query = searchText.current.value;
    setSearchQuery(query);
  };

  useSearchResults(searchQuery);

  const getGeminiMovieResults = async (result) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${result}&include_adult=false&language=en-US&page=1`,
      options
    );

    const json = await data.json();

    return json.results;
  };

  const handleGeminiResults = async () => {
    const query = searchText.current.value;
    console.log(query);
    const geminiQuery =
      "Suggest me names related to the following query :" +
      query +
      "only suggest me 6 names for the query, and result should be comma separated";

    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: geminiQuery,
      });
      const geminiResponses = response.text.split(",");

      if (!geminiResponses) return;

      const promiseResult = geminiResponses.map((result) =>
        getGeminiMovieResults(result)
      );

      const TMDBGeminiResults = await Promise.all(promiseResult);
      console.log(TMDBGeminiResults);
      dispatch(
        addGeminiResults({
          resultsName: geminiResponses,
          geminiResults: TMDBGeminiResults,
        })
      );
    }

    main();
  };

  return (
    <>
      <Header flag={false} app={false} />
      <div className="flex-col mt-16 sm:mt-14 justify-center text-white px-2 sm:px-4">
        <div className="flex flex-col items-center p-2 sm:p-5 ">
          <div className="relative flex w-full sm:w-3/4 md:w-1/2">
            {!geminiButton ? (
              <div className="w-full">
                <>
                  <input
                    type="text"
                    ref={searchText}
                    placeholder="Search Movies | Tv Shows | Actors"
                    className="p-3 bg-white/20 w-full rounded-[5px] outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGptSearchClick();
                      }
                    }}
                  />
                  <FaCircleArrowUp
                    size={28}
                    color="lightgray"
                    className="absolute right-2 top-2.5 bg-black rounded-full cursor-pointer"
                    onClick={() => {
                      handleGptSearchClick();
                    }}
                  />
                </>
                {people?.length === 0 && media?.length === 0 && (
                  <div className="font-bold md:text-5xl text-2xl mx-2 w-[97%] text-center my-20">
                    Search whatever movies or shows or actors you want!
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full">
                <input
                  type="text"
                  ref={searchText}
                  placeholder="What would you like to watch!"
                  className="p-3 bg-white/20 w-full rounded-[5px] outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGeminiResults();
                    }
                  }}
                />

                <FaArrowUp
                  size={28}
                  className="absolute right-2 top-2.5 bg-gradient-to-r p-1 from-purple-500 to-cyan-400 rounded-full cursor-pointer"
                  onClick={() => {
                    handleGeminiResults();
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <>
          {!geminiButton && (
            <div className="text-white md:mx-18 mx-2  my-2">
              {people?.length > 0 && people[0]?.profile_path !== null && (
                <div>
                  <p className="font-bold text-2xl py-2.5">Actors</p>
                  <div className="flex md:gap-6 gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden mb-3">
                    {people.map((p) => (
                      <ActorCard
                        key={p.id}
                        id={p.id}
                        poster={p.profile_path}
                        name={p.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {media?.length > 0 && media[0]?.poster_path !== null && (
                <div>
                  <p className="font-bold text-2xl py-2.5">Media</p>
                  <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden mb-14 md:mb-0">
                    {media.map((m) =>
                      m.media_type === "movie" ? (
                        <MovieCard
                          key={m.id}
                          id={m.id}
                          poster={m.poster_path}
                        />
                      ) : (
                        <TVCard key={m.id} id={m.id} poster={m.poster_path} />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {geminiButton && <GeminiResults />}
        </>
      </div>
    </>
  );
};

export default GPTSearchPage;