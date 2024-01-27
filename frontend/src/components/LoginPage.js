// LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const handleLogin = () => {
    // This is where you would handle authentication logic
    // For now, let's just log a message to the console
    console.log('Login button clicked. Authentication logic will go here.');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Login to EvalUEX</h1>
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="text-lg font-semibold block mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-lg font-semibold block mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
