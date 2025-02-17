// FunctionalityPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import bgImg from '../assets/bg-home.png';

const FunctionalityPage = () => {
  return (
    <div className='h-screen overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${bgImg})` }}>
      <Navbar />

      <div className="flex flex-col items-center justify-start h-screen mt-16">
        <h1 className="text-h3 font-heading mb-2 text-primaryBlue"> <span className='text-primaryRed'>Welcome</span> to EvalUEX</h1>
        <p className="text-body1 font-body mb-8 text-primaryBlue/90">EvalueX is an innovative platform revolutionizing education<br />through intelliegent and automated answer assesment</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-16">
          {/* Marking Scheme Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-heading text-primaryBlue mb-2">Create Marking Scheme</h2>
            <p className="text-gray-600 mb-4">Define a marking scheme by adding questions, correct answers, and evaluation criteria.</p>
            <Link to="/make-marking-scheme">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Make a Marking Scheme
              </button>
            </Link>
          </div>

          {/* Upload Files Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-heading text-primaryBlue mb-2">Upload Student Answers</h2>
            <p className="text-gray-600 mb-4">Submit student answer PDFs for automated evaluation based on the marking scheme.</p>
            <Link to="/upload-files">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Upload Files
              </button>
            </Link>
          </div>

          {/* Evaluation Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-heading text-primaryBlue mb-2">Evaluate Answers</h2>
            <p className="text-gray-600 mb-4">Initiate the automated assesment process, Comparing uploaded answer sheets with the predefined marking scheme.</p>
            <Link to="/evaluate">
              <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                Evaluate
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionalityPage;
