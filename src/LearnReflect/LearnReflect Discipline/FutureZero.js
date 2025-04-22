import React from 'react';
import DropdownMenu from '../Components/DropDownController';
import Bcomponent from '../Components/BComponent';
import LComponent from '../Components/LogoComponent';
import Styles from '../Css/Futurezero.module.css'
function FutureZero(){
return(
    <div className={Styles.futureContainer}>
      <h1 class={Styles.hh1}>Futures Membership</h1>
      <LComponent /> 
      <DropdownMenu /> 
      <Bcomponent /> 
      <div class={Styles.bioContainer}>
      <p class={Styles.biotext}></p>
      
    </div>
  </div>
);
}
export default FutureZero;

