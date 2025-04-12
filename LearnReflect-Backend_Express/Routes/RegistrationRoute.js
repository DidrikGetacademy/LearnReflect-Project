const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const app = express();
const { db } = require('../server');
//post forespørsel til mysql for registrering
app.post('/Register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // sjekker om email allerede eksisterer
      const checkEmailSql = "SELECT * FROM login WHERE email = ?";
      const [result] = await db.promise().query(checkEmailSql, [email]);
  
      if (result.length > 0) {
        console.log('Registration failed: Email already registered.');
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // krypterer passord
      const hashedPassword = await bcrypt.hash(password, 10); 
  
      // sender brukerdata inn til databasen
      const sql = "INSERT INTO login (`name`, `email`, `password`, `role`) VALUES (?)";
      const values = [name, email, hashedPassword, 'user'];
      await db.promise().query(sql, [values]);
  
      console.log('User registered:', email);
      return res.status(201).json({ message: 'Registration Successful.' });
    } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal Server error.' });
    } 
  });

  module.exports = router;
  