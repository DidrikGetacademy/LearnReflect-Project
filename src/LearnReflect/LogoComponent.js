import React from "react";
import tiktok from "LearnReflect/Images/tiktok.png";
import Instagram from "LearnReflect/Images/insta.png";
import X from "LearnReflect/Images/xx.png";
import youtube from "LearnReflect/Images/youtube.png";
import "./Css/LogoComponent.css";

function LComponent() {
  return (


    <div className="img-container">
      <div className="social-icon-container">
        <a href="https://www.tiktok.com/@learnreflectmotivation?is_from_webapp=1&sender_device=pc">
          <img src={tiktok} alt="TikTok Logo" className="social-icon-tiktok" />
        </a>
      </div>
      <div className="social-icon-container">
        <a href="https://www.https://www.instagram.com/learnreflects">
          <img alt="Instagram" src={Instagram} className="social-icon-instagram" />
        </a>
      </div>
      <div className="social-icon-container">
        <a href="https://x.com/learnreflects?s=21">
          <img src={X} alt="X Logo" className="social-icon-X" />
        </a>
      </div>
      <div className="social-icon-container">
        <a href="https://www.youtube.com/@MotivationLearnReflect">
          <img src={youtube} alt="youtube Logo" className="social-icon-youtube" />
        </a>
      </div>
         </div>
  ); 
}

export default LComponent;
