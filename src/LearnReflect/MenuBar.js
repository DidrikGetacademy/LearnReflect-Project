import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./Css/MenuBar.module.css";
import Whitelist from '../LearnReflect/PageComponent';
import ContactNavBar from '../LearnReflect/Contact.js';
import ShopPage from "../LearnReflect/Shop/Shop";
import AISoftware from "./AiSoftware";
import SelfDevelopment from '../LearnReflect/LearnReflect Discipline/SelfDevelopment';
import LRAgent from '../LearnReflect/AI-LearnReflect/Chat/LRAgent';
import VideoIntro from "./VideoIntro";
import MenuComponent from "./Components/MenuComponent";

function IntroPage() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [activePage, setActivePage] = useState(null);
  
  const handleScrollToPage = (page) => {
    setSectionVisible(true);
    setActivePage(page);
    setTimeout(() => {
      const pageSection = document.getElementById("page-section");
      if (pageSection) {
        pageSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className={Styles.container}>
      <div className={`${Styles["extra-site"]} ${Styles.top}`} />
      <div className={`${Styles["extra-site"]} ${Styles.bottom}`} />

      <div className={Styles["Intro-Container"]}>
        <div className={Styles["Intro-Name"]}>
          <h1 className={Styles.Title}>LearnReflects System</h1>

          <MenuComponent handleScrollToPage={handleScrollToPage} />

          <div className={Styles["bio-Intro"]}>
            <br />
            <img alt="SelfDevelopment" className="" src={VideoIntro} />
            <VideoIntro />
          </div>
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
              {activePage === "Ai Software" && <AISoftware />}
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
