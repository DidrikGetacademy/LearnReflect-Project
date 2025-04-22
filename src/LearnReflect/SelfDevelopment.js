import React from "react";
import DropdownMenu from "./Components/DropDownController";
import Bcomponent from "./Components/BComponent";
import LComponent from "./Components/LogoComponent";
import Styles from "../LearnReflect/Css/LearnReflectSelfdevelopment.module.css";

function SelfDevelopment() {
  return (
    <div className={Styles.Homepage}>
      <LComponent />
      <Bcomponent />
      <DropdownMenu />

      <div className={Styles.scrollContainer}>
    <div className={`${Styles.scrollPage} ${Styles.QuoteText}`} id="page-1">
      <p> What is LearnReflect?⚡</p>
    </div>
        <div className={`${Styles.scrollPage} ${Styles.QuoteText}`} id="page-2">
          <p>📊 Daily Reflection Tool</p>
        </div>

        <div className={`${Styles.scrollPage} ${Styles.QuoteText}`} id="page-3">
          <p>📖 Your Growth Journey</p>
        </div>
      </div>
    </div>
  );
}

export default SelfDevelopment;
