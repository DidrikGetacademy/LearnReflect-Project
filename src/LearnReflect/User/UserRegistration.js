import React, { useState } from "react";
//import "../css/RegistrationForm.css";
import { ValidatePassword, EqualPasswords, validateEmail} from "../Components/Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Styles from '../Css/Register.module.css'
function RegistrationForm() {
  const navigate = useNavigate();
  const [errors, SetErrors] = useState({});
  const [Values, setValues] = useState({
    Username: "",
    EmailAddress: "",
    Password: "",
    ConfirmPassword: "",
    BirthDate: ""
  });

  const handleChanges = e => {
    const { name, value } = e.target; //Henter navn og verdi fra input-feltet.
    setValues({ ...Values, [name]: value }); //Beholder de eksisterende verdiene fra inputfeltene og Oppdaterer feltet som er lik 'name' attributtet på input/ oppdaterer det feltet som har blitt endret.
  };

  //Funksjon for ValideringsTest.
  const ValidateForm = () => {
    const validationErrors = {}; // et objekt som lagrer valideringsfeil

    if (!validateEmail(Values.EmailAddress)) {
      validationErrors.EmailAddress = "Incorrect Email Format";
    }
    if (!ValidatePassword(Values.Password)) {
      validationErrors.Password = "Password does not meet criteria";
    }
    if (!EqualPasswords(Values.Password, Values.ConfirmPassword)) {
      validationErrors.ConfirmPassword = "Passwords do not match!";
    }
    SetErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };


  //Funksjon for innsending av login skjema til backend
  const submitRegistrationRequest = async e => {
    e.preventDefault(); // Forhindrer standard/side-refresh ved skjema innsending
    
    const RegistrationData = {
     name: Values.Username,
     email: Values.EmailAddress,
     password: Values.Password
     
    }
 
    if (ValidateForm()) {
      axios.post("http://localhost:8081/Register", RegistrationData, {
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          alert("Response success", response.data);
          navigate("/login");
        }).catch(error => {
          if(error.response){
            console.error("Response Error:",error.response.data);
          }else if (error.request){
            console.error("Request Error:",error.request);
          }else {
            console.error("Error",error.message);
          }
          alert("An error occurred while processing your request.")
        })
    } else return;
  };

  return (
    <div className={Styles.RegisterContainer}>

<form className={Styles.RegisterForm} onSubmit={submitRegistrationRequest}>
<h2 className={Styles.title}>Create Your Account</h2>
      <label>
        Username:
        <input
          onChange={handleChanges}
          className={Styles.input}          
          type="text"
          placeholder="Username"
          name="Username"
          value={Values.Username}
          />
        {errors.Username &&
          <span className="Errors">
            {errors.Username}
          </span>}
      </label>

      <label>
        Email:
        <input
          onChange={handleChanges}
          className={Styles.input}
          type="email"
          placeholder="Email"
          name="EmailAddress"
          value={Values.EmailAddress}
          />
        {errors.EmailAddress &&
          <span className="Errors">
            {errors.EmailAddress}
          </span>}
      </label>

      <label>
        Password:
        <input
          onChange={handleChanges}
          className={Styles.input}
          type="password"
          placeholder="password"
          name="Password"
          value={Values.Password}
          />
        {errors.Password &&
          <span className="Errors">
            {errors.Password}
          </span>}
      </label>

      <label>
        Confirm Password:
        <input
          onChange={handleChanges}
          className={Styles.input}
          type="password"
          placeholder="Confirm Password"
          name="ConfirmPassword"
          value={Values.ConfirmPassword}
          />
        {errors.ConfirmPassword &&
          <span className="Errors">
            {errors.ConfirmPassword}
          </span>}
      </label>
      <label>
        Birthday:
        <input
          className={Styles.input}

          onChange={handleChanges}
          type="date"
          value={Values.BirthDate}
          name="BirthDate"
          />
      </label>
      <button type="submit">Register</button>
    </form>
          </div>
  );
}
export default RegistrationForm;
