import React from "react";
import './Css/modal.css'

const Modal = ({ message, details,description,onClose }) => {
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <ul>{description}</ul>
                <p>{details}</p>
                <p>DownloadLink</p>
                <a href="https://learnreflects.com/Download/LearnReflect%20AI%20Upscaler.exe"><button>Download</button></a>
                <button className="ModalButton" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;