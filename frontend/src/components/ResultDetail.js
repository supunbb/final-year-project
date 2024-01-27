// src/components/ResultDetail.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResultDetail = ({ result, fullMarks }) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(!isDetailsVisible);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <div className="flex justify-between items-center">
        <Link to={`/detail/${result.id}`} className="text-blue-500 hover:underline">
          <h3 className="text-xl font-bold mb-2">{`${result.fileName} - Full Marks: ${fullMarks}`}</h3>
        </Link>
        <button onClick={toggleDetails} className="text-blue-500 hover:underline">
          {isDetailsVisible ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {isDetailsVisible && (
        <div className="mt-4">
          <p>Question 1: {result.question1}</p>
          <p>Answer 1: {result.answer1}</p>
          <p>Marks 1: {result.marks1}</p>
          {/* Add details for other questions */}
        </div>
      )}
    </div>
  );
};

export default ResultDetail;
