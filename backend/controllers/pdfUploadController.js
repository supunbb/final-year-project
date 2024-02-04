const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const StudentAnswer = require('../models/StudentAnswer');
const MarkingScheme = require('../models/MarkingScheme'); // Import the MarkingScheme model

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadPDFs = upload.array('pdfs');

exports.parsePDFs = async (req, res) => {
    try {
        // const { markingSchemeId } = req.body; // Assuming markingSchemeId is passed in the request body
        // const markingScheme = await MarkingScheme.findOne({ markingSchemeId });

        // if (!markingScheme) {
        //   return res.status(404).json({ error: 'Marking scheme not found' });
        // }

        const pdfs = req.files;

        for (const pdf of pdfs) {
            const data = await pdfParse(pdf.buffer);
            const lines = data.text.split('\n');

            let currentQuestionNumber = 0;
            let currentAnswerText = '';

            const studentAnswer = new StudentAnswer({
                fileName: pdf.originalname,
                answers: [],
            });

            for (const line of lines) {
                if (line.includes('.....')) {
                    // Assume encountering a line with more than 5 dots indicates a new answer
                    if (currentQuestionNumber > 0 && currentAnswerText !== '') {
                        studentAnswer.answers.push({
                            questionNumber: currentQuestionNumber,
                            answerText: currentAnswerText,
                        });
                    }

                    currentQuestionNumber += 1;
                    currentAnswerText = '';
                } else {
                    currentAnswerText += line + '\n';
                }
            }

            // Save the student's answer to the database
            await studentAnswer.save();
        }

        res.status(200).json({ message: 'PDFs parsed and answers saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
