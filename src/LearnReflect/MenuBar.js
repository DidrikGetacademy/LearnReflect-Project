import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./Css/MenuBar.module.css";
import Whitelist from './Whitelistpage';
import ContactNavBar from '../LearnReflect/Contact.js';
import ShopPage from "../LearnReflect/Shop/Shop";
import SelfDevelopment from './SelfDevelopment';
import LRAgent from '../LearnReflect/AI-LearnReflect/Chat/LRAgent';
import VideoIntro from "./VideoIntro";
import MenuComponent from "./Components/MenuComponent";
import Payment from "./payment";


function IntroPage() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const handleScrollToPage = (page) => {
    setSectionVisible(true);
    setActivePage(page);
    setTimeout(() => {
      const pageSection = document.getElementById("page-section");
      if (pageSection) {
        const scrollContainer = document.getElementById("scroll-container");
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        }
        
        
      }
    }, 100);
  };
  const isHomePage = activePage === null;

  return (
    
    <div className={Styles.container}>
      {isHomePage && <div className={Styles.backgroundImage3}></div>}
      <div className={`${Styles["extra-site"]} ${Styles.top}`} />
      <div className={`${Styles["extra-site"]} ${Styles.bottom}`} />


      <div className={Styles["Intro-Container"]}>
        <div className={Styles["Intro-Name"]}>

          <MenuComponent handleScrollToPage={handleScrollToPage} />
          {isHomePage && 
          
          <VideoIntro />}

        
        </div>
      </div>

      <div
        id="Work-Section"
        className={`${Styles["work-Section"]} ${sectionVisible ? Styles.visible : ""}`}
      >
        <div className={Styles["work-Content"]}>
          {sectionVisible && (
            <div id="page-section">
              {activePage === "self-dev" && <SelfDevelopment />}
              {activePage === "shop" && <ShopPage />}
              {activePage === "Ai Software" && <Payment />}
              {activePage === "Ai Agent" && <LRAgent />}
              {activePage === "Contact" && <ContactNavBar />}
              {activePage === "whitelist" && <Whitelist />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
