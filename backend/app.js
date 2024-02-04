const express = require('express');
const mongoose = require('mongoose');
const markingSchemeRoutes = require('./routes/markingSchemeRoutes');
const pdfUploadRoutes = require('./routes/pdfUploadRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();

// MongoDB connection setup (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb+srv://supunbb:sb0272245137@pdf-reader0.yobznnh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });



const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(express.json());

// Routes
app.use('/marking-schemes', markingSchemeRoutes);
app.use('/pdf-upload', pdfUploadRoutes);
app.use('/evaluation', evaluationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
