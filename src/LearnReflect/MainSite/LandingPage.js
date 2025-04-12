// LandingPage.js
import { Link } from "react-router-dom";
import React from "react";
import "../Css/LearnReflect.css";


import background from "../../LearnReflect/Images/black2.png";
import PageImg from "../../LearnReflect/Images/Lion.jpg";
import trainer from "../../LearnReflect/Images/4.jpg";
function LearnReflectFont() {
  return (
    <div className="Container-Landingpage">
      <img alt="TrainerImage" className="TrainerImg" src={trainer} />
      <img alt="BackgroundImage" className="Background" src={background} />
      <img alt="LionImage" className="LionImg" src={PageImg} />
      <div className="Intro-text">
        <h1>Welcome to LearnReflect – Your Journey to Personal Excellence Starts Here</h1><br></br>
        <div className="UnderLine">
          Unleash your inner lion <br></br>Embrace the grind<br></br>Leave excuses behind<br></br>Whether you're here to grow, Get inspired, or Transform your habits<br></br> We’re with you every step of the way<br></br>Join a community dedicated to discipline, Self-development, and Unstoppable progress.<br></br> It's time to take control <br></br><br></br>Rewrite your story.
        </div>
      </div>
      <div className="navbar-Landingpage">
        <ul>
          <li>
            <Link to="/Homepage">LearnReflect System</Link>
          </li>
          <li>
            <Link to="/ShopPage">Shop</Link>
          </li>
          <li>
            <Link to="/AIUpscalePage">LearnReflect AI</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default LearnReflectFont;
