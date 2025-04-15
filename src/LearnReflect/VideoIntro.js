import React, { useState } from "react";
import IntroVideoFile from "./video/imageintro.mp4";
import Styles from "../LearnReflect/Css/videointro.module.css";
import stillintro from './Images/introframe.jpg'

const VideoIntro = () => {
  const [played, setPlayed] = useState(false);


  const handleVideoEnd = () => {
    setPlayed(true);
  };


  

  return (
    <div className={Styles["video-intro"]}>
      {!played ? (

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
        ) : (

          <div className={Styles["Image-intro"]}>
          <img className={Styles["Intro-Image"]}alt="img" src={stillintro}/>
          </div>
        )}
    </div>
  );
};

export default VideoIntro;
