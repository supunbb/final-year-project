// Navbar.js
import React from 'react';
import evaluxIcon from '../assets/evalux icon 1.png';


import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primaryBlue/10  px-16 py-4 text-white flex justify-between items-center ">
      <Link to="/" >
        <div className='flex justify-center items-center gap-4'>
          <img src={evaluxIcon} alt="Evalux Icon" className='w-12'/>

          <div className="text-h4 font-heading text-primaryBlue">EvalueX</div>
        </div>
      </Link>
      <div className=" px-6 py-2 bg-primaryBlue rounded-lg">
        <Link to="/login" className="hover:underline text-white font-text text-h5 ">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
