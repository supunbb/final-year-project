const express = require('express');
const evaluationController = require('../controllers/evaluationController');

const router = express.Router();

router.post('/', evaluationController.evaluateAnswers);

module.exports = router;
