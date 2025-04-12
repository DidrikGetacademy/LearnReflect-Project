import React from 'react'
import Checkout from './Checkout'
import { PayPalScriptProvider, } from "@paypal/react-paypal-js";
function Payment() {
    const initialoptions = {
        "client-id": "ASr5PGwN3Ep9FYzVsoRz9WLMDYOX3l1b0z5KvWtxT_Bb75LSyw7MGXS4qvG9D6PfHVGAOd38yNj_j6dC", 
        currency: "USD", 
        intent: "capture", 
      }
    return (
        
        <PayPalScriptProvider options={initialoptions}>
            <Checkout/>
        </PayPalScriptProvider>
    )
}
export default Payment;