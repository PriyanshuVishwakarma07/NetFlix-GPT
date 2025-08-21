import React, { Suspense, lazy } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./utils/appStore";

const Body = lazy(() => import("./components/Body"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const Login = lazy(() => import("./components/Login"));
const Browser = lazy(() => import("./components/Browser"));
const Watch = lazy(() => import("./components/Watch"));
const Actor = lazy(() => import("./components/Actor"));
const GPTSearchPage = lazy(() => import("./components/GPTSearchPage"));

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
          <Body />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
              <LandingPage />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/browser",
          element: (
            <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
              <Browser />
            </Suspense>
          ),
        },
        {
          path: "/gpt",
          element: (
            <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
              <GPTSearchPage />
            </Suspense>
          ),
        },
        {
          path: "/watch",
          element: (
            <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
              <Watch />
            </Suspense>
          ),
        },
        {
          path: "/actor",
          element: (
            <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
              <Actor />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return (
    <Provider store={Store}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;