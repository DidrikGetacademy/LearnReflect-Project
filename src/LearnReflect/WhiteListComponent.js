import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Css/Whitelist.module.css";
function WhitelistComponent() {
  const [EmailInput, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [EmailConfirmation, setEmailConfirmation] = useState(false);
  const [Errormsg, setErrormsg] = useState("");

  useEffect(() => {
    console.log("Emailconfirmation value:", EmailConfirmation)
  }, [EmailConfirmation]);




  const Handlesubmit = async e => {
    e.preventDefault(); // forhindrer standard oppførsel

    setLoading(true); //forhindrer mulighet til og trykke på submit

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email verifikasjon karakterer

    // logger boolean verdi til emailconfirmation på hver render

    // hvis felt er tomt, gir beskjed til bruker med alert.
    if (EmailInput === "") {
      setErrormsg("Email is required!");
      setLoading(false);
      return;
    }
    // hvis felt er tomt, gir beskjed til bruker med alert.
    if (!emailRegex.test(EmailInput)) {
      setErrormsg("Please enter a valid email address");
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post('https://learnreflects.com/Server/save_email_with_spamblock.php',
        { email: EmailInput }
      );

      if (response.status === 200) {
        setEmailConfirmation(true);
        setEmail("");
        setErrormsg("");
      } else {
        setErrormsg(response.data.error || "An unexpected error occurred!");
        if(response.data.error   === 500 && response.err.message === "Failed to save email: "){
          alert('status 500');
        }
      }
    } catch (err) {
      console.log(err.response ? err.response.data : err.message)
      setErrormsg(err.response ? err.response.data : "an unexpected error occured!");
    } finally {
      setLoading(false);
    }
  }


  const handleinput = event => {
    setEmail(event.target.value);
  };

  const closeconfirmation = () => {
    setEmailConfirmation(false);
  };


  return (
    <div className={styles["Whitelist-Container"]}>
      <form className={styles.EmailForm} onSubmit={Handlesubmit}>
        <input
          onChange={handleinput}
          type="email"
          placeholder="Email Address"
          value={EmailInput}
        />
        <button className={styles.submitbutton} type="submit" disabled={loading}>
          {loading ? "Sending..." : "Get Early Access"}
        </button>
        {Errormsg && (
          <p className="error-message">
            {Errormsg} <button>Close</button>
          </p>
        )}
      </form>

      {EmailConfirmation &&
     <div className={styles.modal}>
          <div className={styles["modal-content"]}>
          <p className={styles.Thankyou}>Congratulations!</p>
            <p className={styles["P-Recieved"]}>We will keep you updated!</p>
            <button onClick={closeconfirmation} className={styles["close-button"]}>
              Close
            </button>
          </div>
        </div>}

    </div>
  );
}

export default WhitelistComponent;
