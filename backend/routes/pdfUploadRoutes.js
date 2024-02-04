const express = require('express');
const pdfUploadController = require('../controllers/pdfUploadController');

const router = express.Router();

router.post('/', pdfUploadController.uploadPDFs, pdfUploadController.parsePDFs);

module.exports = router;
