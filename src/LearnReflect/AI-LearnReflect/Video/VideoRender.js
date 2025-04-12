import React, { useState } from "react";
import axios from "axios";

function VideoEnchancerJSX() {
  const [file, setFile] = useState(null);
  const [enhancedVideo, setEnhancedVideo] = useState("");
  const [loading, setLoading] = useState(false);

  const processVideo = () => {
    if (!file) {
      alert("Please select a video first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("video", file);

    axios
      .post("http://localhost:5000/UploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Server response:", response.data);
        setEnhancedVideo(response.data.videoUrl); // Make sure your backend returns `videoUrl`
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="Video-Container">
      <h2>Video Enhancer</h2>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={processVideo} disabled={loading}>
        {loading ? "Processing..." : "Upload Video"}
      </button>
      {enhancedVideo && <video src={enhancedVideo} controls width="600" />}
    </div>
  );
}

export default VideoEnchancerJSX;
