import React, { useState } from "react";
import IntroVideoFile from "./video/imageintro.mp4";
import Styles from "../LearnReflect/Css/videointro.module.css";
import PageComponent from "./PageComponent.js";

const VideoIntro = () => {
  const [played, setPlayed] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleVideoEnd = () => {
    setPlayed(true);
    setFadeIn(true);
  };

  if (played) {
    return (
    <div className={`${Styles["fade-in"]} ${fadeIn ? Styles["visible"] : ""}`}>
<PageComponent />
      </div>
    );
  }

  return (
    <div className={Styles["video-intro"]}>
      <video 
        autoPlay 
        muted 
        playsInline 
        onEnded={handleVideoEnd} 
  className={Styles["Intro-video"]}
      >
        <source  src={IntroVideoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoIntro;
