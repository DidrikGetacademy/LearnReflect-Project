import React from "react";
import "./Css/bottomnavbar.css";
import Instagram from "../LearnReflect/Images/insta.png";
import tiktok from "../LearnReflect/Images/tiktok.png";
import youtube from "../LearnReflect/Images/youtube.png";
function Bottomnavbar() {
  const socialLinks = {
    LocusMotivation: [
      {
        id: 1,
        name: "Tiktok",
        img: tiktok,
        link: ["https://www.tiktok.com/@locusmotivation"]
      },
      {
        id: 2,
        name: "Instagram",
        img: Instagram,
        link: ["https://www.instagram.com/locusmotivation/"]
      },
      {
        id: 3,
        name: "YouTube",
        img: youtube,
        link: ["https://www.youtube.com/@LocusMotivation"]
      }
    ],

    MotivationReflect: [
      {
        id: 4,
        name: "Tiktok",
        img: tiktok,
        link: ["https://www.tiktok.com/@motivationreflect"]
      },
      {
        id: 5,
        name: "Instagram",
        img: Instagram,
        link: ["https://www.instagram.com/motivationreflects/"]
      },
      {
        id: 6,
        name: "YouTube",
        img: youtube,
        link: ["https://www.youtube.com/@MotivationReflectSession"]
      }
    ],

    LearnReflectSystem: [
      {
        id: 7,
        name: "Tiktok",
        img: tiktok,
        link: ["https://www.tiktok.com/@learnreflectsmotivation"]
      },
      {
        id: 8,
        name: "Instagram",
        img: Instagram,
        link: ["https://www.instagram.com/learnreflects/"]
      },
      {
        id: 9,
        name: "YouTube",
        img: youtube,
        link: ["https://www.youtube.com/@LearnReflects"]
      }
    ]
  };

  return (
    <div>
      <p className="collab">collaboration Socials</p>
      <div className="BottomNavBar-Container">
        <div className="collaboration">
        {Object.entries(socialLinks).map(([groupname,links]) => (
          <div key={groupname}>
          <ul>{groupname}</ul>
          {links.map(({ id, name, img, link}) => (
            <a  key={id} href={link} target="_blank" rel="noopener noreferrer">
            <img  alt={name} src={img} />
            </a>
          ))}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
export default Bottomnavbar;
