import React, { useState } from "react";
import axios from "axios";


function AudioEnchancerJSX() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const processAudio = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("audio", file);

    axios
      .post("http://localhost:5000/UploadAudio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Server Response:", response.data);
        // You can handle response here (like setting enhanced audio or score)
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="Audio-Container">
      <h2>Audio Enhancer</h2>
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={processAudio} disabled={loading}>
        {loading ? "Processing..." : "Upload Audio"}
      </button>
    </div>
  );
}

export default AudioEnchancerJSX;