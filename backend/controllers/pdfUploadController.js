const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const StudentAnswer = require('../models/StudentAnswer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create uploads folder if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

exports.uploadPDFs = upload.array('pdfs', 10); // Limit to 10 files at a time

exports.parsePDFs = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No PDF files uploaded' });
        }

        console.log('Files Uploaded:', req.files.map(file => file.filename));

        const results = [];

        for (const pdf of req.files) {
            const pdfPath = path.join(__dirname, '../uploads/', pdf.filename);
            const data = await pdfParse(fs.readFileSync(pdfPath)); // Read file from local storage

            const lines = data.text.split('\n');
            let currentQuestionNumber = 0;
            let currentAnswerText = '';

            const studentAnswer = new StudentAnswer({
                fileName: pdf.filename,
                answers: [],
            });

            for (const line of lines) {
                if (line.includes('.....')) {
                    if (currentQuestionNumber > 0 && currentAnswerText.trim() !== '') {
                        studentAnswer.answers.push({
                            questionNumber: currentQuestionNumber,
                            answerText: currentAnswerText.trim(),
                        });
                    }
                    currentQuestionNumber += 1;
                    currentAnswerText = '';
                } else {
                    currentAnswerText += line + '\n';
                }
            }

            if (currentAnswerText.trim() !== '') {
                studentAnswer.answers.push({
                    questionNumber: currentQuestionNumber,
                    answerText: currentAnswerText.trim(),
                });
            }

            const answer = await studentAnswer.save();
            results.push(answer);
        }

        res.status(200).json({
            message: 'PDFs saved, parsed, and answers stored successfully',
            savedAnswers: results,
        });
    } catch (error) {
        console.error('Error processing PDFs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
