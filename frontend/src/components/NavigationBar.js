import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div>
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div className="text-2xl font-bold">EvalUEX</div>
            <div className="space-x-4">
            <Link to="/profile" className="hover:underline">Profile</Link>
    </div>
  </nav></div>
  )
}

export default NavigationBar