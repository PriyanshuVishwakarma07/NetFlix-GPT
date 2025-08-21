import React from "react";
import Header from "./Header";
import { useSearchParams } from "react-router-dom";
import WatchMedia from "./WatchMedia";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("v");
  const mediaType = searchParams.get("type") || "movie";

  return (
    <div className="">
      <Header flag={false} app={false} />
      <div className="h-full">
        <WatchMedia mediaId={mediaId} mediaType={mediaType} />
      </div>
    </div>
  );
};

export default Watch;