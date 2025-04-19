import React, { useState, useRef, useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"; //PayPal script is loading and can be used to change the values of the options of the PayPal script and at the same time reload the script with the updated parameters.
import styles from  './Css/checkout.module.css';
import ImageCarousel from "./ImageCarousel";
import Modal from "./RequestSubmittedModal";
import {  useNavigate } from "react-router-dom";
function Checkout() {
    const Navigate = useNavigate();
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();// paypal script reducer manage a way to manage the state of the paypalscript, sutchs as client side with buttons, if a customer choose another currency, reducer will update this.
    const [currency, setCurrency] = useState(options.currency);
    const emailref = useRef("");
    const [subscriptiontype,setsubscriptiontype] = useState("monthly");
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [modalmessage,setmodalMessage] = useState("")
    const [modaldetails,setmodaldetails] = useState("");
    const [modalmessagedescription,setmodalmessagedescription] = useState("")
    const [isemailvalid, setisEmailValid] = useState(false);
    const subscriptiontypeRef = useRef(subscriptiontype)

    const handleEmailChange = () => {
        const emailInput = emailref.current.value; // gets the current value of the email input using the useref, that gets the present value.
        setisEmailValid(validateEmail(emailInput)) // usestate funtion that sets the value of the isemailvalid after the validation has been approved or denied. 
    }

    const validateEmail = (email) => {
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //Regex for a valid email.
        return emailregex.test(email) // returns a boolean value of true or false depending on the test confirmation of the email
    }

    const CheckPaymentValue = () => {
       return !isemailvalid;  //disable button if email is not valid
    }


    useEffect(()=>{
        subscriptiontypeRef.current = subscriptiontype;
    },[subscriptiontype]);




    const handlesubscription = (e) => {
        setsubscriptiontype(e.target.value)
     }




     const getAmount = () => {
        const currentsubscriptiontype = subscriptiontypeRef.current;
        if(currentsubscriptiontype === "monthly"){
            console.log("Returning 12.99 for monthly subscription");
            return "12.99";
        } else if (currentsubscriptiontype === "permanent"){
            console.log("Returning 50.00 for permanent subscription")
            return "50.00";
        }
        console.log("No valid subscription type provided!");
        return "0.00";
     };




  
    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({ type: 'resetOptions', value: { ...options, currency: value, }, });
    }



    const onCreateOrder2 = (data, actions) => {
        alert("Purchases are currently disabled. This software is not for sale yet.");
        return actions.reject(); // Cancel PayPal flow
    }
    

    // const onCreateOrder = (data, actions) => {
    //     const amount = getAmount();
    //     console.log("amount: ",amount);
    //     console.log("Data in the oncreateOrder Function: ", data)
    //     return actions.order.create({
    //         purchase_units: [{ amount: { value: amount, }, },], 
    //     });
    // }



    const ClosePaymentModal = () => {
        Navigate('/');
    }




    const onApprove = (data, actions) => {
        const emailInput = emailref.current.value;
        if (!emailInput) {
            alert('Please provide your email!');
            return;
        }
        return actions.order.capture().then((details) => {
            const orderAmount = details.purchase_units[0].amount.value;
            const OrderId = details.id;
            const name = details.payer.name.given_name;
            const email = emailInput || details.payer.email_address;
            const subscription_type = subscriptiontypeRef.current
            if (details.id === '') {
                console.log('Order_id is empty');
                alert('Error, Details ID is empty');
                return;
            }
            if (email === '') {
                console.log('Email is empty');
                alert("Please write in your email");
                return;
            }
            console.log('Details from paypal transaction: ', details)
            if (orderAmount !== getAmount()) {
                console.log("Payment amount does not match", orderAmount, );
                return;
            }
            fetch("https://learnreflects.com/Server/Generate_PrivateKey.php", {
                method: "POST",
                body: JSON.stringify({subscription_type: subscription_type, email: email, amount: orderAmount, order_id: OrderId }),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.text())
                .then((text) => {
                    console.log("Raw response text", text);
                    try { 
                        const data = JSON.parse(text);
                        console.log("Parsed JSON: ", data);
                        if (data.key_code) {
                            console.log("Server keycode: ", name + " " + data.key_code);
                            setmodalMessage("Thanks for payment!")
                            setmodalmessagedescription(" you will recieve Key-Code in your email")
                            setmodaldetails(`Order ID: ${details.id} - EmailAdress: ${emailref.current.value}`)
                            setIsModalOpen(true);
                        } else if (data.error) {
                            console.log("Server error: ", data.error);
                        } else if (data.message) {
                            console.log("Server message: ", data.message)
                        }
                    } catch (error) {
                        console.error("Error parsing JSON: ", error, text);
                    }
                }).catch((error) => {
                    console.error("Error during fetch: ", error)
                })
        });
    };



    return (
        <div style={{ display: "flex", alignItems: "center", minHeight: "100vh", width: "100vw", justifyContent: "center", padding: "40px 20px", boxSizing: "border-box", }}>

            <div className={styles.checkout}>
                <ImageCarousel />
                <div className={styles.paymentSection}>
                    <label>Please choose a payment method below</label>
                        <select className={styles.selectSubscription} value={subscriptiontype} onChange={handlesubscription}>
                        <option value="monthly">Monthly (subscription) - 12.99 EUR</option>
                        <option value="permanent">Permanent (one-time) - 50.00 EUR</option>
                    </select>
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                          <select className={styles.currencySelect} value={currency} onChange={onCurrencyChange}>
                                <option className="option" value="USD">💵 USD</option>
                                <option className="option" value="EUR">💶 Euro</option>
                            </select>
                        </>
                    )}
                    <label>Please write in your email for details:</label>
                    <input onChange={handleEmailChange} type="email" placeholder="E-Mail" className={styles.EmailInput} ref={emailref} />
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder2(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                        onError={(err) => console.error("Paypal error: ", err)}
                        disabled={CheckPaymentValue()}
                    />
                </div>
            </div>
            {isModalOpen  && (<Modal details={modaldetails} description={modalmessagedescription} message={modalmessage} onClose={() => ClosePaymentModal()}/>)}
        </div>
    );


}

export default Checkout;

