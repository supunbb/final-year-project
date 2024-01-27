// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Automated Answer Evaluation</h1>
        <p className="text-lg text-center mb-8">
          Evaluate students' answers automatically with EvalUEX. Streamline your grading process.
        </p>
        <Link to="/login">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
