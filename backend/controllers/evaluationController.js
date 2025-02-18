const MarkingScheme = require("../models/MarkingScheme");
const stringSimilarity = require("string-similarity");

exports.evaluateAnswers = async (req, res) => {
  try {
    const { markingSchemeId, studentAnswers } = req.body;
    const markingScheme = await MarkingScheme.findOne({ markingSchemeId });

    const studentName = studentAnswers[0].fileName.split("-")[1].split(".")[0];

    if (!markingScheme) {
      return res.status(404).json({ error: "Marking scheme not found" });
    }

    if (!markingScheme.questions || !Array.isArray(markingScheme.questions)) {
      return res.status(400).json({ error: "Invalid marking scheme data" });
    }

    const questions = markingScheme.questions;

    let totalMarks = 0;
    let answerList = [];

      studentAnswers.forEach((studentAnswer) => {

        studentAnswer.answers.forEach((answerObject) => {

          const question = questions.find(
            (q) => q.questionNumber === answerObject.questionNumber
          );

          if (!question) {
            console.warn(
              `Warning: No matching question found for questionNumber ${answerObject.questionNumber}`
            );
            return; // Skip to the next answer
          }

          
          let marks = 0;
          if (question.evaluationType) {
            marks = directEvaluate(answerObject, question);
          } else {
            marks = essayEvaluate(answerObject, question);
          }
          totalMarks+=marks;
          const a = {
            questionNumber: answerObject.questionNumber,
            studentAnswer: answerObject.answerText,
            correctAnswer: question.correctAnswer,
            keywords: question.keywords,
            marks, 
          }
          answerList.push(a)
          
        });
      });


    res.status(200).json({ studentName, totalMarks, answerList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const directEvaluate = (studentAnswer, markingSchemeAnswer) => {
  let correctAnswer = markingSchemeAnswer.correctAnswer;

  let marks = studentAnswer.answerText
    .toLowerCase()
    .includes(correctAnswer.toLowerCase())
    ? markingSchemeAnswer.allocatedMarks
    : 0;

  return marks;
};

const keywordEvaluate = (studentAnswerObject, markingSchemeAnswerObject) => {
  let studentAnswer = studentAnswerObject.answerText.toLowerCase();
  let keywords = markingSchemeAnswerObject.keywords[0]
    .split(",")
    .map((s) => s.trim());
  let matchCount = 0;

  for (let i = 0; i < keywords.length; i++) {
    let m = studentAnswer.toLowerCase().includes(keywords[i].toLowerCase());

    if (m) matchCount++;
  }

  let marks =
    markingSchemeAnswerObject.allocatedMarks * (matchCount / keywords.length);

  return marks;
};

const essayEvaluate = (studentAnswer, markingSchemeAnswer) => {

  let keywordMarks = keywordEvaluate(studentAnswer, markingSchemeAnswer);
  let answerText = studentAnswer.answerText;
  let correctAnswer = markingSchemeAnswer.correctAnswer;

  let essayEvaluateScore =
    Math.floor(stringSimilarity.compareTwoStrings(answerText, correctAnswer)) *
    100;


  let marks = Math.floor((keywordMarks + essayEvaluateScore) / 2);

  return marks;
};
