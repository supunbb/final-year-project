// routes/session.js
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Define your routes here

// routes/session.js
// ... (previous code)

router.post('/', async (req, res) => {
    try {
      const { name } = req.body;
      const newSession = new Session({ name });
      await newSession.save();
      res.status(201).json(newSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  // routes/session.js
// ... (previous code)

router.get('/', async (req, res) => {
    try {
      const sessions = await Session.find();
      res.json(sessions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.json(session);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // routes/session.js
// ... (previous code)

router.put('/:id', async (req, res) => {
    try {
      const { name } = req.body;
      const updatedSession = await Session.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!updatedSession) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.json(updatedSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const deletedSession = await Session.findByIdAndDelete(req.params.id);
      if (!deletedSession) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.json(deletedSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // ... (other routes)
  
  // ... (other routes)
  
  // ... (other routes)
  


module.exports = router;
