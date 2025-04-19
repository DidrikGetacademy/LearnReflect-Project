import React, { useState } from 'react';
import arrow from '../Images/Arrow2.png';
import Styles from "../Css/MenuBar.module.css";

const MenuComponent = ({ handleScrollToPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <>

       <div className={`${Styles.MenuContainer} ${isMenuOpen ? Styles.open : Styles.closed}`}>
          
          <button onClick={() => handleScrollToPage("self-dev")}>LearnReflects Self Development</button>
          <button onClick={() => handleScrollToPage("shop")}>Shop</button>
          <button onClick={() => handleScrollToPage("Ai Software")}>LearnReflects AI Software</button>
          <button onClick={() => handleScrollToPage("Ai Agent")}>LearnReflect Agent</button>
          <button onClick={() => handleScrollToPage("Contact")}>Contact us</button>
          <button onClick={() => handleScrollToPage("whitelist")}>WhiteList</button>
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
