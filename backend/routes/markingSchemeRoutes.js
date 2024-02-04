const express = require('express');
const markingSchemeController = require('../controllers/markingSchemeController');

const router = express.Router();

router.post('/', markingSchemeController.createMarkingScheme);

module.exports = router;
