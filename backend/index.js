// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Session = require('./models/Session'); // Import your model
const User = require('./models/User'); // Add this line
const passport = require('./passport-config'); // Adjust the path accordingly
const app = express();
app.use(express.json());
app.use(passport.initialize());



const authRoutes = require('./routes/authRoutes'); // Adjust the path accordingly
const protectedRoutes = require('./routes/protectedRoutes'); // Adjust the path accordingly
app.use('/auth', authRoutes); // Public routes for registration and login
app.use('/protected', passport.authenticate('jwt', { session: false }), protectedRoutes); // Protected routes

const port = 5000;

app.use(cors());

mongoose.connect('mongodb+srv://supunbb:sb0272245137@evaluex.ztr264j.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const sessionRoutes = require('./routes/session');
app.use('/api/sessions', sessionRoutes); // This sets up routes for '/api/sessions'


module.exports = {
  // ... (export other models or connection details as needed)
  User,
};
