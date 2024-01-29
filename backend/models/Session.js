// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
