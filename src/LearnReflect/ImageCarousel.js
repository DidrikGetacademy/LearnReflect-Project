import React, { useEffect, useState } from "react";
import Upscaled1 from '../LearnReflect/Images/Oppskalert1.png';
import Upscaled2 from '../LearnReflect/Images/Oppskalert2.png';
import SoftwareIMG1 from '../LearnReflect/Images/APP1.png'
import SoftwareIMG2 from '../LearnReflect/Images/APP2.png'
import SoftwareIMG3 from '../LearnReflect/Images/APP3.png'
import SoftwareIMG4 from '../LearnReflect/Images/APP4.png'
import SoftwareIMG5 from '../LearnReflect/Images/app5.png'
import SoftwareIMG6 from '../LearnReflect/Images/app6.png'
import SoftwareIMG7 from '../LearnReflect/Images/app7.png'
import SoftwareIMG8 from '../LearnReflect/Images/app8.png'
import SoftwareIMG9 from '../LearnReflect/Images/app9.png'
import SoftwareIMG10 from '../LearnReflect/Images/app10.png'
import Styles from  './Css/imageCarousal.module.css';
const images = [SoftwareIMG1, Upscaled1, Upscaled2,SoftwareIMG2,SoftwareIMG3,SoftwareIMG4,SoftwareIMG5,SoftwareIMG6,SoftwareIMG7,SoftwareIMG8,SoftwareIMG9,SoftwareIMG10];

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