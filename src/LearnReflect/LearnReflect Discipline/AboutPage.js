import React from 'react';
import DropdownMenu from '../Components/DropDownController';
import Bcomponent from '../Components/BComponent';
import LComponent from '../Components/LogoComponent';
import Styles from '../Css/aboutpage.module.css'
function AboutPage(){
  
return(
    <div className={Styles.aboutcontainer}>
      <h1 className={Styles.hh1}>About LearnReflect</h1>
         <LComponent/>
         <Bcomponent/>
         <DropdownMenu /> 
         <div class={Styles.bioContainer}>
          <p class={Styles.biotext}></p>
        </div>
</div>
);
}

export default AboutPage;

