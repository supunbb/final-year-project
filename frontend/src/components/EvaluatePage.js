import React, { useState, useContext } from "react";
import NavigationBar from "./Navbar";
import { EvaluationContext } from "../context/EvaluationContext";

const EvaluatePage = () => {
  const { evaluationData } = useContext(EvaluationContext);
  const [viewIndex, setViewIndex] = useState(null); // Track which item is being viewed

  // Ensure evaluationData is an array
  if (!Array.isArray(evaluationData)) {
    return <p>No evaluation data available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Evaluate Page
        </h1>

        <ul>
          {evaluationData.map((data, index) => (
            <li key={index} className="mb-4">
              <button
                onClick={() => setViewIndex(index)}
                className="w-full bg-green-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                <h1>
                  {data.studentName ? data.studentName : "Student name"}
                </h1>
                <h2>
                  {data.totalMarks !== undefined
                    ? `Total Marks: ${data.totalMarks}`
                    : "Total Marks"}
                </h2>
              </button>

              {viewIndex === index && (
                <div className="mt-4 bg-gray-50 p-4 rounded-md shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">
                    Answer List
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 bg-white">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="py-2 px-4 border">Question Number</th>
                          <th className="py-2 px-4 border">Student Answer</th>
                          <th className="py-2 px-4 border">Correct Answer</th>
                          <th className="py-2 px-4 border">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.answerList.map((answer, ansIndex) => (
                          <tr key={ansIndex} className="text-center border-b">
                            <td className="py-2 px-4 border">
                              {answer.questionNumber}
                            </td>
                            <td className="py-2 px-4 border">
                              {answer.studentAnswer}
                            </td>
                            <td className="py-2 px-4 border">
                              {answer.correctAnswer}
                            </td>
                            <td className="py-2 px-4 border">{answer.marks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={() => setViewIndex(null)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EvaluatePage;
