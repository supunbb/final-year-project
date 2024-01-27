// FunctionalityPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const FunctionalityPage = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <div className="text-2xl font-bold">EvalUEX</div>
        <div className="space-x-4">
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome to EvalUEX</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/make-marking-scheme">
            <button className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-blue-700">
              Make a Marking Scheme
            </button>
          </Link>

          <Link to="/upload-files">
            <button className="bg-green-500 text-white px-8 py-6 rounded-lg hover:bg-green-700">
              Upload Files
            </button>
          </Link>

          <Link to="/evaluate">
            <button className="bg-purple-500 text-white px-8 py-6 rounded-lg hover:bg-purple-700">
              Evaluate
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalityPage;
