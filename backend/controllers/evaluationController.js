const MarkingScheme = require("../models/MarkingScheme");
const stringSimilarity = require("string-similarity");
const StudentAnswer = require("../models/StudentAnswer");

exports.evaluateAnswers = async (req, res) => {
  try {
    const { markingSchemeId, studentAnswersIds } = req.body;
    const markingScheme = await MarkingScheme.findOne({ markingSchemeId });

    console.log(
      "markingSchemeId, studentAnswersId",
      markingSchemeId,
      studentAnswersIds
    );

    const marksList = await Promise.all(
      studentAnswersIds.map(async (aid) => {
        const sa = await StudentAnswer.findById(aid);
        const studentName = sa.fileName.split("-")[1].split(".")[0];

        if (!markingScheme) {
          return res.status(404).json({ error: "Marking scheme not found" });
        }

        if (
          !markingScheme.questions ||
          !Array.isArray(markingScheme.questions)
        ) {
          return res.status(400).json({ error: "Invalid marking scheme data" });
        }

        const questions = markingScheme.questions;

        let totalMarks = 0;
        let fullMarks = 0;
        let answerList = [];

        await Promise.all(
          sa.answers.map(async (answerObject) => {
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
              marks = await essayEvaluate(answerObject, question);
            }
            totalMarks += marks;
            fullMarks += question.allocatedMarks;
            console.log(marks, totalMarks);
            const a = {
              questionNumber: answerObject.questionNumber,
              studentAnswer: answerObject.answerText,
              correctAnswer: question.correctAnswer,
              keywords: question.keywords,
              marks,
            };
            answerList.push(a);
          })
        );

        return {
          _id: sa._id,
          fileName: sa.fileName,
          studentName,
          totalMarks,
          answerList,
        };
      })
    );

    res.status(200).json(marksList);
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

const essayEvaluate = async (studentAnswer, markingSchemeAnswer) => {
  let keywordMarks = keywordEvaluate(studentAnswer, markingSchemeAnswer);
  let answerText = studentAnswer.answerText;
  let correctAnswer = markingSchemeAnswer.correctAnswer;
  let essayEvaluateScore = 0;

  const url = `https://twinword-text-similarity-v1.p.rapidapi.com/similarity/?text1=${answerText}&text2=${correctAnswer}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f65f9d288dmshc7237f422f663b4p120364jsnea1457252e8b",
      "x-rapidapi-host": "twinword-text-similarity-v1.p.rapidapi.com",
    },
  };
  try {
    console.log(url);
    const response = await fetch(url, options);
    const result = await response.json();
    essayEvaluateScore = Math.floor(result.similarity * markingSchemeAnswer.allocatedMarks);
    console.log(essayEvaluateScore);
  } catch (error) {
    console.error(error);
  }
  console.log(essayEvaluateScore);
  return Math.floor((keywordMarks + essayEvaluateScore) / 2);
};
