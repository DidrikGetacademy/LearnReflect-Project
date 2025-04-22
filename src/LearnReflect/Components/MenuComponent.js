import React, { useState } from 'react';
import arrow from '../Images/Arrow2.png';
import Styles from "../Css/MenuBar.module.css";

const MenuComponent = ({ handleScrollToPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);

  };
  const handlemenuclick = (page)  => {
    handleScrollToPage(page)
    setIsMenuOpen(false)
  }

  return (
    <>

       <div className={`${Styles.MenuContainer} ${isMenuOpen ? Styles.open : Styles.closed}`}>
          
          <button onClick={() => handlemenuclick("self-dev")}>LearnReflects Self Development</button>
          <button onClick={() => handlemenuclick("shop")}>Shop</button>
          <button onClick={() => handlemenuclick("Ai Software")}>LearnReflects AI Software</button>
          <button onClick={() => handlemenuclick("Ai Agent")}>LearnReflect Agent</button>
          <button onClick={() => handlemenuclick("Contact")}>Contact us</button>
          <button onClick={() => handlemenuclick("whitelist")}>WhiteList</button>
        </div>
        <img
  src={arrow}
  alt="menu arrow"
  className={`${Styles.NavigationImage} ${isMenuOpen ? Styles.arrowOpen : Styles.arrowClosed}`}
  onClick={toggleMenu}
  style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
/>

    </>
  );
};

export default MenuComponent;
