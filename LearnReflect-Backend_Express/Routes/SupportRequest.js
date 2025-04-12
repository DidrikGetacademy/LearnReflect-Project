const express = require('express');
const router = express.Router();
const { db } = require('../server');  
const app = express();
//post forespørsel til mysql for Contact
app.post('supportRequest', async (req,res) => {
    const {email, category, message} = req.body;
    try{
      const sql = "INSERT INTO support_requests (`id`email`category`message)";
      const values = [id,email,category,message]
      await db.promise().query(sql,[values]);
    }catch{
      console.log('Error',db.error)
    }
  })
  
  
  db.connect((err) => {
    if (err) {  
        console.log('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
  }); 
  
  module.exports = router;