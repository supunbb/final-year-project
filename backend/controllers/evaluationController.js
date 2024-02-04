const MarkingScheme = require('../models/MarkingScheme');
const StudentAnswer = require('../models/StudentAnswer');
const stringSimilarity = require("string-similarity");

exports.evaluateAnswers = async (req, res) => {
    try {
        const { markingSchemeId } = req.body;
        const markingScheme = await MarkingScheme.findOne({ markingSchemeId });


        if (!markingScheme) {
            return res.status(404).json({ error: 'Marking scheme not found' });
        }

        questions = markingScheme.questions;

        let totalMarks = 0;
        const studentAnswers = await StudentAnswer.find({});

        studentAnswers.forEach(studentAnswer => {

            studentAnswer.answers.forEach(answerObject => {
                question = questions.find(question => question.questionNumber === answerObject.questionNumber)

                if (question.evaluationType) {
                    totalMarks += directEvaluate(answerObject, question)
                }
                else {
                    totalMarks += essayEvaluate(answerObject, question)
                }
            })
            console.log(totalMarks)
        })

        // let totalMarks = 0;

        // for (const studentAnswer of studentAnswers) {
        //   let studentMarks = 0;

        //   for (const answer of studentAnswer.answers) {
        //     const question = markingScheme.questions.find(q => q.questionNumber === answer.questionNumber);

        //     if (!question) {
        //       continue; // Handle the case where question number from the answer is not found in marking scheme
        //     }

        //     if (question.evaluationType === 1) {
        //       // Direct Evaluation
        //       const matchingKeywords = answer.answerText
        //         .toLowerCase()
        //         .split(' ')
        //         .filter(word => question.keywords.includes(word));

        //       studentMarks += (matchingKeywords.length / question.keywords.length) * question.allocatedMarks;
        //     } else {
        //       // Essay Evaluation - You would need to integrate Hugging Face API for this part
        //       // The logic here is a placeholder, actual implementation depends on the API response
        //       studentMarks += 0; // Placeholder for essay evaluation marks
        //     }
        //   }

        //   totalMarks += studentMarks;
        // }

        //     res.status(200).json({ totalMarks });
        res.status(200).json({ totalMarks: totalMarks })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};


const directEvaluate = (studentAnswerObject, markingSchemeAnswerObject) => {
    let studentAnswer = studentAnswerObject.answerText.toLowerCase();
    let keywords = markingSchemeAnswerObject.keywords;
    console.log(studentAnswer)
    console.log(keywords)

    for (let i = 0; i < keywords.length; i++) {
        console.log(studentAnswer.includes(keywords[i]))
        if (!studentAnswer.includes(keywords[i].toLowerCase()))
            return 0;
    }
    return markingSchemeAnswerObject.allocatedMarks;
}

const essayEvaluate = (studentAnswer, markingSchemeAnswer) => {
    let keywordEvaluate = directEvaluate(studentAnswer, markingSchemeAnswer);
    let answerText = studentAnswer.answerText
    let correctAnswer = markingSchemeAnswer.correctAnswer;

    let essayEvaluateScore = Math.floor(stringSimilarity.compareTwoStrings(answerText, correctAnswer)) * 100;


    return (keywordEvaluate + essayEvaluateScore) / 2;

}