// authRoutes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path accordingly
const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, 'sb0272245137', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;


