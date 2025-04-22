import React, { useState } from "react";
import axios from "axios";
import Styles from '../Css/login.module.css';
import DropdownMenu from "../Components/DropDownController";
import Bcomponent from "../Components/BComponent";
import LComponent from "../Components/LogoComponent";
import { useAuth } from "../Components/Authanciation/AuthProvider";
import { EmptyInput } from "../Components/Validation";

function LoginPage() {
  const { loginAction } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({ name: "", password: "" });

  const messages = {
    IncorrectUsername: "Incorrect Username",
    EmptyField: "Fields can't be empty",
    WrongPassword: "Wrong Password",
    ServerError: "Server Error",
    incorrectCredential: "Please enter a valid email and password."
  };

  const handleInput = event => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!EmptyInput(values.name, values.password)) {
      try {
        const response = await axios.post("http://localhost:8081/login", values);
        const responseData = response.data;

        if (responseData.success) {
          loginAction(responseData);
        } else if (responseData === "Incorrect Username or Email") {
          setErrorMessage(messages.IncorrectUsername);
        } else if (responseData === "Incorrect password") {
          setErrorMessage(messages.WrongPassword);
        } else if (responseData === "No user exsist") {
          setErrorMessage(messages.IncorrectUsername);
        } else {
          setErrorMessage(messages.ServerError);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error occurred while processing your request");
      }
    } else {
      setErrorMessage(messages.EmptyField);
    }
  };

  return (
    <div className={Styles.loginWrapper}>
      <h1 className={Styles.title}>Login to LearnReflect</h1>
      <LComponent />
      <Bcomponent />
      <DropdownMenu />

      <div className={Styles.loginContainer}>
        <form onSubmit={handleSubmit} className={Styles.loginForm}>
          {errorMessage && (
            <label className={Styles.errorLabel}>
              {errorMessage}
            </label>
          )}

          <input
            onChange={handleInput}
            name="name"
            placeholder="Username or Email"
            className={Styles.input}
          />

          <input
            onChange={handleInput}
            name="password"
            placeholder="Password"
            type="password"
            className={Styles.input}
          />

          <button type="submit" className={Styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
