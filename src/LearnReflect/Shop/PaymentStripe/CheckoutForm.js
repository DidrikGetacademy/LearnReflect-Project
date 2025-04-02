import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "../css/LearnReflect.css";
export default function CheckoutForm({ totalAmount }) {
 console.log('TotalAmount',totalAmount);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const goto = () => {
  navigate('/ShopPage');
 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/Completion`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="Main-Container">
    <button onClick={goto}>Exit</button>
    <div className='TitleHeader'>Checkout</div>
    <div className="checkout-panel">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">{isProcessing ? "Processing ..." : "Pay now"}</span>
        </button>
          <label>Total Amount: {totalAmount.toFixed(2)}€</label>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
    </div>
  );
  
}

  
