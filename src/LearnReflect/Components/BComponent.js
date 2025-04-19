import React from 'react';
import { Link } from 'react-router-dom';
import Styles from "../Css/LearnReflectSelfdevelopment.module.css";
function Bcomponent(){
return(
<div className={Styles.buttonContainer}>
        <Link to='/Homepage'>
          <button>LearnReflect</button>
        </Link>
        <Link to='/LR'>
          <button>Official</button>
        </Link>
        <Link to='/Discipline'>
          <button>Discipline</button>
        </Link>
      </div>
)};

export default Bcomponent;