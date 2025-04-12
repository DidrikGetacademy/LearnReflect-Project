const express = require('express');
const router = express.Router();
const app = express();
const { resolve } = require("path");

const path = require('path');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
  });
  
  
  
  
  const staticDir = resolve(__dirname, process.env.STATIC_DIR || '../Frontend/build');
  app.use(express.static(staticDir));
  
  
  
  app.get("/", (req, res) => {
    const indexPath = resolve(staticDir, "index.html");
    res.sendFile(indexPath);
  });
  
  
  
  app.get("/config", (req, res) => {
    console.log("Received request to /config");
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });
  
  
  
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          currency: "EUR",
          amount: amount,
          automatic_payment_methods: { enabled: true },
        });
  
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (e) {
        return res.status(400).send({
          error: {
            message: e.message,
          },
        });
      }
    });

    module.exports = router;