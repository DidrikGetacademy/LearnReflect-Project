import axios from "axios";
import React, { useEffect, useState } from "react";

function EarlyAccess() {
  const [Count, setCount] = useState(0);

  useEffect(() => {
    axios.get("https://learnreflects.com/Server/get_user_count.php")
      .then(response => {
        console.log(response.data); // Log the full response
        setCount(Number(response.data.count) || "Error"); // Access the count property directly
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <span>
        Join
        <span className="P-Early"> {Count} + </span> others in getting early access!
      </span>
    </div>
  );
}

export default EarlyAccess;
