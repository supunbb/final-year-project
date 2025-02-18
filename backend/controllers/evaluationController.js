const MarkingScheme = require("../models/MarkingScheme");
const StudentAnswer = require("../models/StudentAnswer");
const stringSimilarity = require("string-similarity");

exports.evaluateAnswers = async (req, res) => {
  try {
    const { markingSchemeId, studentAnswers } = req.body;
    const markingScheme = await MarkingScheme.findOne({ markingSchemeId });

    if (!markingScheme) {
      return res.status(404).json({ error: "Marking scheme not found" });
    }

    if (!markingScheme.questions || !Array.isArray(markingScheme.questions)) {
      return res.status(400).json({ error: "Invalid marking scheme data" });
    }

    const questions = markingScheme.questions;
    console.log("Questions:", questions); // Debugging output

    let totalMarks = 0;
    // const studentAnswers = await StudentAnswer.find({});

    studentAnswers.forEach((studentAnswer) => {
      console.log("studentAnswer.answers", studentAnswer.answers);
      studentAnswer.answers.forEach((answerObject) => {
        console.log("Question No: ", answerObject.questionNumber);
        const question = questions.find(
          (q) => q.questionNumber === answerObject.questionNumber
        );

        if (!question) {
          console.warn(
            `Warning: No matching question found for questionNumber ${answerObject.questionNumber}`
          );
          return; // Skip to the next answer
        }

        console.log("E type: ", question.evaluationType);
        if (question.evaluationType) {
          totalMarks += directEvaluate(answerObject, question);
        } else {
          totalMarks += essayEvaluate(answerObject, question);
        }
        console.log("..........................................");
      });
    });

    console.log("Total Marks:", totalMarks);
    res.status(200).json({ totalMarks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const directEvaluate = (studentAnswer, markingSchemeAnswer) => {
  let correctAnswer = markingSchemeAnswer.correctAnswer;
  console.log(
    "D - studentAnswer ",
    studentAnswer.answerText,
    "Correct Answer ",
    correctAnswer
  );

  let marks = studentAnswer.answerText
    .toLowerCase()
    .includes(correctAnswer.toLowerCase())
    ? markingSchemeAnswer.allocatedMarks
    : 0;
  console.log("D Marks ", marks);
  return marks;
};

const keywordEvaluate = (studentAnswerObject, markingSchemeAnswerObject) => {
  let studentAnswer = studentAnswerObject.answerText.toLowerCase();
  let keywords = markingSchemeAnswerObject.keywords[0].split(',').map(s => s.trim());
  console.log("K - studentAnswer ", studentAnswer);
  console.log("keywords ", keywords);
  let matchCount = 0;

  for (let i = 0; i < keywords.length; i++) {
    let m = studentAnswer.toLowerCase().includes(keywords[i].toLowerCase());
    console.log("K Eval ", m);
    if (m) matchCount++;
  }
  console.log(matchCount, markingSchemeAnswerObject.allocatedMarks);
  let marks =
    markingSchemeAnswerObject.allocatedMarks * (matchCount / keywords.length);
  console.log("K Eval Marks ", marks);
  return marks;
};

const essayEvaluate = (studentAnswer, markingSchemeAnswer) => {
  console.log("E - studentAnswer ", studentAnswer.answerText);
  let keywordMarks = keywordEvaluate(studentAnswer, markingSchemeAnswer);
  let answerText = studentAnswer.answerText;
  let correctAnswer = markingSchemeAnswer.correctAnswer;

  let essayEvaluateScore =
    Math.floor(stringSimilarity.compareTwoStrings(answerText, correctAnswer)) *
    100;
  console.log("E Eval ", essayEvaluateScore);

  let marks = Math.floor((keywordMarks + essayEvaluateScore) / 2);
  console.log("E Total ", marks);
  return marks;
};
