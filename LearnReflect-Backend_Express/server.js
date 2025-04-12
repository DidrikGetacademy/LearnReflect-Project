// imports
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require("dotenv").config({ path: "./.env" });



   //mysql Connection
   const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
module.exports = { db };

//Routes
const loginRoutes = require('./Routes/LoginRoute');
const registerRoute = require('./Routes/RegistrationRoute');
const supportRequest = require('./Routes/SupportRequest');
const stripePayment = require('./Routes/StripePaymentRoute');


//Cors options
const allowedOrigin = ['http://localhost:3001','http://localhost:8081','http://192.168.10.116:3001'];
const corsOptions = {
    origin: (origin,callback) => {
      if(allowedOrigin.indexOf(origin) !== -1 || !origin){
        callback(null,true);
      } else {
        callback(new Error('not allowed by cors'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credential: true, 
   }

   app.use(cors(corsOptions));
   app.use(express.json());
// app use the api for the Routes
app.use('/api',loginRoutes);
app.use('/api',registerRoute);
app.use('/api',supportRequest)
app.use('/api',stripePayment)




//Server Start
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


