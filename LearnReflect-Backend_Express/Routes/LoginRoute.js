
//post forespørsel til mysql for login
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const router = express.Router();
const { db } = require('../server');  
app.post('/login', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const sql = "SELECT * FROM login WHERE `name` = ? OR `email` = ?";
      const [data] = await db.promise().query(sql, [name, email]);
  
      if (data.length === 0) {
        return res.json("No user exists");
      }
  
      const user = data[0];
  
      //sammenlign det hashedpassordet med brukerpassordet 
      const match = await bcrypt.compare(password, user.password);
  
      if (match) {
        return res.json({ success: true, userId: user.id, username: user.name });
      } else {
        return res.json("Incorrect password");
      }
    } catch (err) {
      console.error('Database Error:', err);
      return res.json("Error");
    }
  });
  
  module.exports = router;