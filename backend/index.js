// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define your routes and API endpoints here

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// index.js
// ... (previous code)

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// ... (remaining code)
