import '../Css/Menubar.css'
import React from "react";
function DescriptionComponent({ title, description, onClose }) {
    return (
        <div className='Description-overlay'>
            <div className='Description'>
                <h2>{title}</h2>
                <p>{description}</p>
                <button className='close-btn' onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default DescriptionComponent;