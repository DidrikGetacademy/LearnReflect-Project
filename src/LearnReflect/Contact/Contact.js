import React, { useState } from "react";
import "../css/LearnReflect.css";
import { Link } from "react-router-dom";
import LR from "../../Images/LearnReflect.jpeg";
import axios from 'axios';

function Contact() {
  const [SupportRequestMessage, SetSupportMessage] = useState();
  const [values, setValues] = useState({ email: '', category: '', message: '' });
  const [ErrorMessage, SetMessage] = useState("");

  const message = {
    email: "Please enter a valid email address",
    category: "Please select an option",
    message: "Please enter a message",
    Error: "Error"
  };

  const EmptyField = () => {
    setValues({
      email: "",
      category: "",
      message: ""
    });
  };

  const HandleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const ContactRequest = (event) => {
    event.preventDefault();

    // Validering før innsending
    if (!values.email) {
      SetMessage(message.email);
      return;
    } else if (!values.category) {
      SetMessage(message.category);
      return;
    } else if (!values.message) {
      SetMessage(message.message);
      return;
    }

    axios.post('http://localhost:8081/SupportRequest', values)
      .then(res => {
        console.log('response', res.data);
        SetSupportMessage("Support Request Submitted. We will contact you soon.");
        SetMessage(""); // Tilbakestill feilmeldingen hvis alt gikk bra
      })
      .catch(err => {
        console.error('error', err);
        SetMessage(message.Error); // Sett en generell feilmelding ved feil
      })
      .finally(() => {
        EmptyField();
      });
      
  };

  return (
    <div className="contact-page">
      <Link to="/LR">
        <img className="LR-Logo" src={LR} alt="Learn Reflect" />
      </Link>

      {ErrorMessage && <label className="error-message">{ErrorMessage}</label>}
      <div className="ContactTitleHeader">Submit support request</div>
      <form className="SupportRequestForm" onSubmit={ContactRequest}>
        <input type="email" placeholder="Email" name='email' onChange={HandleChange} value={values.email} />
        <div>
          <label>Category</label>
          <select value={values.category} name="category" onChange={HandleChange}>
            <option value="">Select Category</option>
            <option value="Account Issue">Account Issue</option>
            <option value="Questions">Questions</option>
          </select>
        </div>
        <textarea
          className="RequestMessage"
          name="message"
          placeholder="Your message"
          value={values.message}
          onChange={HandleChange}
        />
        {SupportRequestMessage && <label>{SupportRequestMessage}</label>}
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
