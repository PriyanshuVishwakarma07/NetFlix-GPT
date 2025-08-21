import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { NETFLIX_BG_IMG } from "../utils/constant";
import { LandingPageLanguage } from "../utils/languageConstant";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const lang = useSelector((store) => store.config.lang);
  return (
    <div className="w-full relative">
      <Header flag={true} app={true} />
      <div className="absolute top-0 left-0 right-0 w-full h-screen sm:h-screen md:h-screen z-10 bg-black/50 overflow-hidden"></div>
      <img
        className="w-full h-screen sm:h-screen md:h-screen object-cover"
        src={NETFLIX_BG_IMG}
        alt="netflix-bg"
      />
      <div className="absolute z-30 top-40 sm:top-36 md:top-46 w-full text-center px-2">
        <p className="text-white font-extrabold max-w-[95vw] sm:max-w-[750px] mx-auto text-2xl sm:text-4xl md:text-6xl leading-8 sm:leading-12 md:leading-18 ">
          {LandingPageLanguage[lang].welcomeText}
        </p>
        <p className="text-base sm:text-lg md:text-[18px] font-semibold text-white py-2 sm:py-3 ">
          {LandingPageLanguage[lang].watchText}
        </p>
        <button className="text-base sm:text-lg md:text-[18px] font-bold cursor-pointer text-white bg-red-600 rounded-[5px] py-3 px-6 sm:py-5 sm:px-10 mt-2">
          <Link to="login">{LandingPageLanguage[lang].getStarted}</Link>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;