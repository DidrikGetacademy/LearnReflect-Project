import React from "react";
import DropdownMenu from "../Components/DropDownController";
import Bcomponent from "../Components/BComponent";
import LComponent from "../Components/LogoComponent";
import "../css/LearnReflect.css";
function HomePage() {
  return (
    <div className="Homepage">
      <h1 className="hh1">LearnReflect</h1>
      <LComponent />
      <Bcomponent />
      <DropdownMenu />

      <div className="scroll-container">
        <div className="scroll-page - QuoteText" id="page-1" />

        <div className="scroll-page   - QuoteText" id="page-2" />

        <div className="scroll-page   - QuoteText" id="page-3" />
      </div>
    </div>
  );
}
export default HomePage;
