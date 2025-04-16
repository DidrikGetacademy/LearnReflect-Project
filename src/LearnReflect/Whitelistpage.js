import React from "react";
import WhitelistComponent from "./WhiteListComponent"; 
import styles from "./Css/Whitelist.module.css";
function WhitelistPage() {
  return (
    <div className={styles.pagecomponent}>
      <div className={styles.scrollPage}>
        <div className={styles.preReleaseContainer}>
          <div className={styles.scrollContainer}>
          <h1 className={styles.homeTopTitle}>
              {" "}Empowering Your Self-Development Journey with Cutting-Edge AI
            </h1>
            <div className={styles.whitelist}>
              <WhitelistComponent />
            </div>
            <div className={styles.learnReflect}>
              <p>
                LearnReflect is a cutting-edge self-improvement platform that
                harnesses the power of AI<br/> To help - Assist & guide you to
                achieve personal growth.
              </p>
              <p>
                Build discipline & stay motivated.<br /> Our suite of AI-driven
                tools includes routine planners and personalized motivation
                strategies. The LR-Chatbot is pre-trained for self-improvement
                and will continuously learn from your conversations, becoming
                tailored to your specific goals. Over time, you'll have your own
                AI assistant that knows you, guiding you with personalized
                discipline-building techniques to help you stay focused on your
                goals.
              </p>
              <p>
                In addition<br /> we offer advanced AI models for enhancing
                video and audio quality, making LearnReflect an all-in-one
                solution<br /> for anyone seeking to improve themselves and
                their productivity. <br />
                Whether you're aiming to boost your daily habits or <br />{" "}
                achieve long-term success,<br /> LearnReflect is your guide to
                becoming the best version of yourself.
              </p>
              <p>
                And coming soon, the LearnReflect Store will provide you with
                exclusive products, resources, and tools designed to support
                your self-improvement journey. Stay tuned for exciting
                offerings!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhitelistPage;
