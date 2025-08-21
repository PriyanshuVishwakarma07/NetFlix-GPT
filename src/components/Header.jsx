import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constant";
import { addFilter } from "../utils/filterSlice";
import {
  hideGeminiSearch,
  hideGPTPage,
  showGeminiSearch,
  showGPTPage,
} from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { Language } from "@google/genai";
import { loginLanguage } from "../utils/languageConstant";

const Header = ({ flag, app }) => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filter);
  const [userMenu, setUserMenu] = useState(false);

  const user = useSelector((store) => store.user);
  const gpt = useSelector((store) => store.gpt);
  const navigate = useNavigate();
  const lang = useSelector((store) => store.config.lang);

  const filters = ["Home", "Movies", "TV Shows", "Actors"];

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const toggleUserMenu = () => {
    setUserMenu(!userMenu);
  };
  return (
    <div>
      {app ? (
        <div className="absolute z-20 top-0 left-0 right-0 flex items-center justify-between py-2 px-4 sm:px-8 md:px-16 lg:px-[130px] ">
          <Link to="/">
            <img
              src="/geminiLogoNetflix.png"
              alt="logo"
              className="w-[120px] h-[32px] sm:w-[150px] sm:h-[38px] md:w-[180px] md:h-[42px] lg:w-[200px] lg:h-[45px]"
            />
          </Link>
          <div className="flex gap-2 sm:gap-4">
            <select
              name="language"
              className="bg-white/15 outline-1 rounded-[3px] text-white px-2 py-1 text-sm sm:text-base md:py-1.5 "
              onChange={handleChangeLanguage}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="text-black font-semibold"
                >
                  {lang.name}
                </option>
              ))}
            </select>
            {flag && (
              <div>
                <button className="hidden sm:block py-1 px-3 sm:py-1.5 text-nowrap sm:px-4 rounded-[5px] bg-red-600 text-white text-sm sm:text-base">
                  <Link to="login">{loginLanguage[lang].signIn}</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Top bar */}
          <div className="absolute z-20 top-0 left-0 right-0 bg-black flex items-center justify-between px-2 sm:px-6 md:px-10 py-1.5">
            {/* Left: Logo (always) and Filters (desktop only) */}
            <div className="flex items-center">
              <Link to="/browser">
                <img
                  alt="logo"
                  src="/geminiLogoNetflix.png"
                  className="w-[100px] h-[30px] sm:w-[140px] sm:h-[38px] md:w-[180px] md:h-[48px] pt-1.5"
                />
              </Link>
              {/* Desktop filters */}
              <ul className="hidden lg:flex gap-3 sm:gap-5 md:gap-7 items-center pt-1.5 ml-6">
                {filters.map((filter) => (
                  <li
                    key={filter}
                    className={`font-bold cursor-pointer hover:text-white ${
                      selectedFilter === filter ? "text-white" : "text-white/60"
                    } ${gpt?.gptButton ? "text-white/60" : ""}`}
                    onClick={(e) => {
                      dispatch(addFilter(filter));
                      dispatch(hideGPTPage());
                      navigate("/browser");
                    }}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: Gemini button + Account/User menu */}
            <div className="flex items-center gap-2">
              {/* Gemini/Search button */}
              {!gpt.geminiButton ? (
                <button
                  onClick={() => {
                    navigate("/gpt");
                    dispatch(showGeminiSearch());
                  }}
                  className="md:px-4 px-2 py-1 md:py-2 rounded-[5px] font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-400 text-center shadow-md text-sm sm:text-base"
                >
                  GO GEMINI
                </button>
              ) : (
                <button
                  className="md:px-4 px-2 py-1 md:py-2 rounded-[5px] font-bold text-black bg-white text-center shadow-md text-sm sm:text-base"
                  onClick={() => {
                    navigate("/gpt");
                    dispatch(hideGeminiSearch());
                  }}
                >
                  Search
                </button>
              )}
              {/* Account/User menu */}
              <div
                onClick={() => {
                  toggleUserMenu();
                }}
                className="flex items-center rounded-[5px] cursor-pointer md:ml-2"
              >
                <img
                  src={user.photoURL}
                  className="w-[28px] md:w-[35px] md:mr-0.5 rounded-[5px]"
                />
                <RiArrowDropDownLine size={30} color="white" />
              </div>
              {userMenu && (
                <ul className="absolute md:top-16 md:right-10 top-12 right-6 text-sm w-34 bg-black border border-white text-white pt-1.5 font-semibold z-50">
                  <li className="py-1.5 px-2 flex">
                    <img
                      src={user.photoURL}
                      alt="user-avatar"
                      className="w-[20px] mr-1"
                    />
                    {user.displayName || "Display Name"}
                  </li>
                  <li className="flex items-center py-1 px-2">
                    <CiUser size={20} className="pr-1" /> Account
                  </li>
                  <li className="py-1.5 px-2 flex items-center">
                    <IoIosHelpCircleOutline size={20} className="pr-1" />
                    Help Center
                  </li>
                  <li
                    onClick={() => {
                      handleSignOut();
                    }}
                    className="py-2 px-2 border-t text-center cursor-pointer hover:text-white hover:bg-white/20"
                  >
                    Log out
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* Mobile/Tablet filters at the very bottom */}
          <ul className="fixed bottom-0 left-0 right-0 z-60 flex lg:hidden gap-10 sm:gap-5 md:gap-7 items-center justify-center w-full bg-black py-3 border-t border-white/10">
            {filters.map((filter) => (
              <li
                key={filter}
                className={`font-bold cursor-pointer hover:text-white text-sm sm:text-base ${
                  selectedFilter === filter ? "text-white" : "text-white/60"
                } ${gpt?.gptButton ? "text-white/60" : ""}`}
                onClick={(e) => {
                  dispatch(addFilter(filter));
                  dispatch(hideGPTPage());
                  navigate("/browser");
                }}
              >
                {filter}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Header;