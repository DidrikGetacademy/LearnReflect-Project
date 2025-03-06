import React from "react";
import TimerComponent from "../Components/TimerComponent";
import LComponent from "../Components/LogoComponent";
function CountDown() {
  return (
    <div>
      <div className="scroll-container">
        <LComponent />
        <div className="scroll-page - QuoteText" id="page-1">
          <TimerComponent />
        </div>
        <div className="scroll-page   - QuoteText" id="page-2" />
        <div className="scroll-page   - QuoteText" id="page-3" />
      </div>
    </div>
  );
}
export default CountDown;
