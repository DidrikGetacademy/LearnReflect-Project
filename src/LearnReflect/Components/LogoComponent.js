import React from 'react';
import tiktok from '../Images/tiktok.png';
import Instagram from '../Images/insta.png';
import X from '../Images/xx.png';

function LComponent() {
  return (
    <div className='img-container'>
      <div className="social-icon-container">
        <a href='https://www.tiktok.com/@learnreflectsession?is_from_webapp=1&sender_device=pc'>
          <img src={tiktok} alt="TikTok Logo" className="social-icon" />
        </a>
      </div>
      <div className="social-icon-container">
        <a href='https://www.instagram.com/learnreflects'>
          <img alt="Instagram" src={Instagram}  className="social-icon" />
        </a>
      </div>
      <div className="social-icon-container">
        <a href='https://x.com/learnreflects?s=21'>
          <img src={X} alt="X Logo" className="social-icon" />
        </a>
      </div>
    </div>
  );
};


export default LComponent;