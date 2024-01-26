// src/components/AnswerSchemeCard.js
import React from 'react';

const AnswerSchemeCard = ({ question, scheme }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">{question}</h2>
      <p className="text-gray-600">{scheme}</p>
    </div>
  );
};

export default AnswerSchemeCard;
