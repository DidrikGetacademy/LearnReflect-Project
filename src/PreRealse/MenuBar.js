import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Css/MenuBar.module.css"; 
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function MenuBar() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", action: "", Requirements: [], Features: [] });
    const [IsInStock, SetIsInStock] = useState(true);

    const handleClose = () => {
        setShow(false);
        SetIsInStock(true);
    };

    const handleShow = (title, action, Requirements, Features) => {
        setModalContent({ title, action, Requirements, Features });
        setShow(true);
    };

    const handlePayment = () => {
        navigate("./Payment");
    };

    const requirements = [
        "Windows 11 / Windows 10 (SOON => mac,linux compatible)",
        "RAM 8GB or Higher",
        "ANY DirectX12 compatible GPU with 4GB or bigger VRAM",
    ];

    const features = [
        "Elegant and easy to use GUI",
        "Image and Video upscale",
        "Multiple GPUs support",
        "Compatible images - jpg, png, tif, bmp, webp, heic",
        "Compatible video - mp4, webm, mkv, flv, gif, avi, mov, mpg, qt, 3gp",
        "Automatic image tiling to avoid GPU VRAM limitation",
        "Resize image/video before upscaling",
        "Interpolation between original file and upscaled file",
        "Video upscaling STOP & RESUME",
        "PRIVACY FOCUSED - no internet connection required / everything is on your PC",
        "COMING SOON: AUDIO ISOLATION & AUDIO ENHANCEMENT",
    ];

    return (
        <div className={styles.backgroundImg}>

        <div className={styles.menuBarContainer}>
        <nav className={`navbar navbar-expand-lg  ${styles.customNavbar}`}>
                <div className={styles.container}>
                    <div >
                        {[
                            { title: "Get Early Access – Whitelist Today" },
                            { title: "LearnReflect System" },
                            {
                                title: "Boost Video Quality – Purchase LR-VideoEnhancer",
                                action: "The ultimate solution",
                                Features: features,
                                Requirements: requirements,
                            },
                            {
                                title: "LearnReflect Agent",
                                action:
                                "LR-Chatbot: Your Personalized Self-Improvement Assistant. Introducing the LR-Chatbot, an integral component of the LearnReflect self-improvement platform, designed to empower your personal growth journey. This AI-driven chatbot leverages advanced machine learning techniques to provide tailored guidance and support as you work towards achieving your goals. Pre-trained specifically for self-improvement, the LR-Chatbot engages in meaningful conversations, continuously learning from your interactions to adapt to your unique aspirations. Whether you’re striving to build discipline, enhance motivation, or develop effective daily routines, this chatbot becomes a personal companion dedicated to your success. The LR-Chatbot offers personalized discipline-building strategies and motivation techniques, ensuring that you remain focused and accountable on your journey. With its ability to understand your evolving needs, the chatbot provides insights and encouragement that resonate with you, making self-improvement an achievable goal. In conjunction with our advanced AI models for enhancing video and audio quality, LearnReflect serves as an all-in-one solution for anyone committed to self-improvement and productivity.",
                            },
                            { title: "Contact us" },
                        ].map((item, index) => (
                            <div className={`col-14 mb-2 ${styles.col12Background}`} key={index}>
                                <span
                                    onClick={() => {
                                        if (item.title === "Get Early Access – Whitelist Today") {
                                            navigate("./PageComponent");
                                        } else if (item.title === "Contact us") {
                                            navigate("./Contact");
                                        } else if (item.title === "LearnReflect System") {
                                            navigate("/Landingpage");
                                        } else if (item.title === "LearnReflect") {
                                            navigate("./LearnReflect");
                                        } else {
                                            handleShow(item.title, item.action, item.Requirements, item.Features);
                                        }
                                    }}
                                    className={styles.titleSpan}
                                >
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            <Modal show={show} className={`${styles.modalFade} fade`} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent.action && <p>{modalContent.action}</p>}

                    {modalContent.Features && (
                        <div>
                            <h5>Features:</h5>
                            <ul>
                                {modalContent.Features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {modalContent.Requirements && (
                        <div>
                            <h5>Requirements:</h5>
                            <ul>
                                {modalContent.Requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    {modalContent.title === "Buy VideoUpscaler AI" && IsInStock && (
                        <Button variant="secondary" onClick={handlePayment}>
                            Buy
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
                    </div>
    );
}
