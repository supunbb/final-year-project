const express = require('express');
const markingSchemeController = require('../controllers/markingSchemeController');

const router = express.Router();

router.post('/', markingSchemeController.createMarkingScheme);

router.get('/', markingSchemeController.getAllMarkingSchemes);

router.put('/:id', markingSchemeController.updateMarkingScheme);

router.delete('/:id', markingSchemeController.deleteMarkingScheme);

module.exports = router;
