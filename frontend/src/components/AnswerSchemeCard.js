// src/components/Dashboard/AnswerSchemeCard.js
import React from 'react';

const AnswerSchemeCard = ({ question, scheme }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md mb-4">
      <h3 className="text-lg font-bold mb-2">{question}</h3>
      <p>{scheme}</p>
    </div>
  );
};

export default AnswerSchemeCard;
