import React, { useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail, validatePassword } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_BG_IMG, USER_AVATAR } from "../utils/constant";
import { loginLanguage } from "../utils/languageConstant";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [emailMsg, setEmailMsg] = useState(null);
  const [pwdMsg, setPwdMsg] = useState(null);
  const dispatch = useDispatch();

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const lang = useSelector((store) => store.config.lang);

  const handleFormClick = () => {
    const emailMessage = validateEmail(email.current.value);
    setEmailMsg(emailMessage);
    const pwdMessage = validatePassword(password.current.value);
    setPwdMsg(pwdMessage);

    if (emailMessage || pwdMessage) return;

    if (!isLoginForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up

          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleLoginForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  return (
    <div className="relative w-full">
      <Header flag={false} app={true} />
      <div className="absolute top-0 left-0 right-0 w-full h-screen sm:h-screen md:h-screen z-10 bg-black/50"></div>
      <img
        className="w-full h-screen sm:h-screen md:h-screen object-cover"
        src={NETFLIX_BG_IMG}
        alt="netflix-bg"
      />
      <form
        className="absolute top-[130px] sm:top-[60px] md:top-[75px] z-40 w-[90vw] max-w-[350px] sm:max-w-[400px] md:min-w-[500px] md:mx-[270px] bg-black/70 rounded-[5px] px-4 sm:px-8 md:px-14 pt-6 pb-6 left-1/2 -translate-x-1/2 md:-translate-x-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="text-white font-bold text-2xl sm:text-3xl md:text-[30px] mb-6">
          {isLoginForm
            ? loginLanguage[lang].signIn
            : loginLanguage[lang].signUp}
        </p>
        {!isLoginForm ? (
          <input
            ref={name}
            type="text"
            placeholder={loginLanguage[lang].userPlaceholder}
            className="p-2 sm:p-3.5 border-[1px] border-white w-full text-white text-lg sm:text-2xl rounded-[5px] mb-4"
          />
        ) : (
          ""
        )}
        <input
          ref={email}
          type="text"
          placeholder={loginLanguage[lang].emailPlaceholder}
          className="p-2 sm:p-3.5 border-[1px] border-white w-full text-white text-lg sm:text-2xl rounded-[5px]"
        />
        <p className="text-red-600 text-xs sm:text-sm mb-4">{emailMsg}</p>
        <div className="relative">
          <input
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder={loginLanguage[lang].password}
            className="p-2 sm:p-3.5 border-[1px] border-white w-full text-white text-lg sm:text-2xl rounded-[5px] pr-10"
          />
          <p className="text-red-600 text-xs sm:text-sm mb-4">{pwdMsg}</p>
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {showPassword ? (
              <FaRegEye
                onClick={toggleShowPassword}
                color="white"
                size={25}
                className="cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={toggleShowPassword}
                color="white"
                size={25}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <button
          onClick={() => {
            handleFormClick();
          }}
          className="p-2 sm:p-3 bg-red-600 w-full font-bold cursor-pointer text-white text-lg sm:text-2xl rounded-[2px] mt-2"
        >
          {isLoginForm
            ? loginLanguage[lang].signIn
            : loginLanguage[lang].signUp}
        </button>
        <p className="text-[14px] sm:text-[16px] my-2 text-white ">
          {isLoginForm
            ? loginLanguage[lang].newUser
            : loginLanguage[lang].existUser}
          <span
            onClick={() => {
              toggleLoginForm();
            }}
            className="font-bold cursor-pointer pl-1"
          >
            {isLoginForm
              ? loginLanguage[lang].nowSignUp
              : loginLanguage[lang].nowSignIn}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;