// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();

// Import your authentication middleware (ensureAuthenticated)
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// Protected route that requires authentication
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send('Welcome to the dashboard!');
});

module.exports = router;


