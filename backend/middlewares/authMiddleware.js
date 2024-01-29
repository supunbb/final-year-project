// middlewares/authMiddleware.js
const ensureAuthenticated = (req, res, next) => {
    // Your authentication logic here
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    res.redirect('/login'); // Redirect to login page if not authenticated
  };
  
  module.exports = { ensureAuthenticated };
  