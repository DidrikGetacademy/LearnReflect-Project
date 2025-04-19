import React, { useEffect, useState } from "react";
import SoftwareIMG1 from '../LearnReflect/Images/toolwindow.png';
import SoftwareIMG2 from '../LearnReflect/Images/videoenchancer.png';
import Upscaled1 from '../LearnReflect/Images/Oppskalert1.png';
import Upscaled2 from '../LearnReflect/Images/Oppskalert2.png';
import SoftwareIMG10 from '../LearnReflect/Images/app10.png';
import socialmediauploadIMG from '../LearnReflect/Images/socialmediaupload.png';
import software7 from '../LearnReflect/Images/software7.png';
import software3 from '../LearnReflect/Images/software3.png';
import youtubedownloaderIMG from '../LearnReflect/Images/youtube downloader.png';
import selectedfilesimg from '../LearnReflect/Images/selectedfiles.png';
import mediainfoanalyst from '../LearnReflect/Images/mediainfoanalyst.png';
import LRAGENTIMG from '../LearnReflect/Images/LRAGENT.png'
import toollistimg from '../LearnReflect/Images/toolslist.png'
import Styles from  './Css/imageCarousal.module.css';
const images = [software7,software3,youtubedownloaderIMG,selectedfilesimg,LRAGENTIMG,toollistimg,mediainfoanalyst,SoftwareIMG1, Upscaled1, Upscaled2,SoftwareIMG2,SoftwareIMG10,socialmediauploadIMG];

function ImageCarousel() {
    const [currentindex, setCurrentIndex] = useState(0);// statevariabel som innholder nåværende bilde som vises.
    const totalImages = images.length; // variabel som holder lengden på arrayet med alle bildene.


    // custom funksjon for å sette forrige bilde.
    const prevImage = () => {
        setCurrentIndex((previndex) => (previndex - 1 + totalImages) % totalImages); // setter bilde index til forrige bildet i arrayet..
    }

    const nextImage = () => {
        setCurrentIndex((nextimage) => (nextimage + 1) % totalImages); // setter currentindex til neste i arrayet..
    }



    useEffect(() => {

    }, [])

    return (
        <div>
            <h2 className={Styles["h2-title"]}>LearnReflect VideoEnchancer</h2>
            <div className={Styles["Image-Scroll"]}>
                <div className={Styles["image-container"]}>
                    <img className={Styles["SoftWareImg"]} src={images[currentindex]} alt="SoftwareIMG" />
                </div>
                <div className={Styles["navigation-buttons"]}>
                    <button className={Styles["nav-button"]}  onClick={prevImage}>←</button> 
                    <button className={Styles["nav-button"]}    onClick={nextImage}>→</button> 
                </div>
            </div>
        </div>

    );
}

export default ImageCarousel;