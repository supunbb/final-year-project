import React, { useState, useContext } from "react";
import NavigationBar from "./Navbar";
import { EvaluationContext } from "../context/EvaluationContext";

const EvaluatePage = () => {
  const { evaluationData } = useContext(EvaluationContext);
  const [view, setView] = useState(false);

  console.log(evaluationData.answerList);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Evaluate Page
        </h1>

        <button
          onClick={() => setView(true)}
          className="w-full bg-green-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          <h1>
            {evaluationData.studentName
              ? evaluationData.studentName
              : "Student name"}
          </h1>
          <h2>
            {evaluationData.totalMarks !== undefined
              ? `Total Marks: ${evaluationData.totalMarks}`
              : "Total Marks"}
          </h2>
        </button>

        {view && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-md">
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
                  {evaluationData.answerList.map((data, index) => (
                    <tr key={index} className="text-center border-b">
                      <td className="py-2 px-4 border">{data.questionNumber}</td>
                      <td className="py-2 px-4 border">{data.studentAnswer}</td>
                      <td className="py-2 px-4 border">{data.correctAnswer}</td>
                      <td className="py-2 px-4 border">{data.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setView(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluatePage;
