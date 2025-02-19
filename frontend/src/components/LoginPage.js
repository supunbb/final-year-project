// LoginPage.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import bgImg from '../assets/bg-login.png';
import evaluxIcon from '../assets/evalux icon 1.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    if(username==='admin' && password==='admin')
      navigate('/profile');
    else alert('Incorrect username or password!');
  };

  return (
    <div className="flex flex-col items-start justify-center h-screen overflow-hidden bg-cover bg-center p-16" style={{ backgroundImage: `url(${bgImg})` }}>

      <div className="w-5/12 bg-white p-6 rounded-lg shadow-md ">
        <div className='flex justify-start items-start gap-4 mb-2'>
          <img src={evaluxIcon} alt="Evalux Icon" className='w-12' />
          <div className="text-h4 font-heading text-primaryBlue">Login</div>
        </div>


        <div className="mb-4">
          <label htmlFor="username" className="text-h5 font-semibold text-primaryBlue block mb-2 ">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-h5 font-semibold text-primaryBlue block mb-2 ">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="px-6 py-2 bg-primaryBlue rounded-lg hover:bg-blue-700 hover:underline text-white font-text text-h5 "
            onClick={handleLogin}
          >
            Login
          </button>
          {/* <Link to="/signup" className=" text-primaryBlue hover:underline">
            Sign Up
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
