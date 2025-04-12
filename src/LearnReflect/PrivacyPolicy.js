import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy for VideoUploaderApp</h1>
      <p>
        VideoUploaderApp is a desktop application that allows users to log in to
        their own YouTube account and upload videos using the YouTube Data API v3.
      </p>
      <p>
        This app does not collect, store, or share any personal information. All
        authentication is handled securely via Google OAuth 2.0.
      </p>
      <p>
        All tokens are stored locally on the user's device and are never sent to
        our servers.
      </p>
      <p>
        We only request the following scope:{" "}
        <code>https://www.googleapis.com/auth/youtube.upload</code>
      </p>
      <p>
        If you have any questions or concerns, contact: fight4nugati@gmail.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
