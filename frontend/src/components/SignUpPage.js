// SignUpPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // For now, just navigate to the functionality page
    navigate('/profile');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Sign Up for EvalUEX</h1>
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        {/* ... (unchanged) */}
        <div className="flex justify-between items-center">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-700"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
