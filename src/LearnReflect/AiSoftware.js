import ImageCarousel from './ImageCarousel'
import Styles from  './Css/imageCarousal.module.css';
function AISoftware(){
    return (
        <div>
                <div className={Styles["AISoftware-Container"]}>
            <div>
                <h1>LearnReflect AI</h1>
                    <ImageCarousel/>
                </div>
            </div>
        </div>
    )
}
export default AISoftware;