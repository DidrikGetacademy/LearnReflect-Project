import React from "react";
import DropdownMenu from "../Components/DropDownController";
import Bcomponent from "../Components/BComponent";
import LComponent from "../Components/LogoComponent";
import Styles from "../Css/LearnReflectSelfdevelopment.module.css";

function SelfDevelopment() {
  return (
    <div className={Styles.Homepage}>
      <h1 className={Styles.hh1}>LearnReflect</h1>
      <LComponent />
      <Bcomponent />
      <DropdownMenu />

      <div className={Styles.scrollContainer}>
    <div className={`${Styles.scrollPage} ${Styles.QuoteText}`} id="page-1">
      <p>This is page 1</p>
    </div>
        <div className={`${Styles.scrollPage} ${Styles.QuoteText}`} id="page-2">
          <p>This is page 2</p>
        </div>

        <div className={`${Styles.scrollPage} ${Styles.QuoteText}`} id="page-3">
          <p>This is page 3</p>
        </div>
      </div>
    </div>
  );
}

export default SelfDevelopment;
