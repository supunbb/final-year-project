// Navbar.js
import React from 'react';
import evaluxIcon from '../assets/evalux icon 1.png';


import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primaryBlue/10  px-16 py-2 text-white flex justify-between items-center ">
      <Link to="/" >
        <div className='flex justify-center items-center gap-2'>
          <img src={evaluxIcon} alt="Evalux Icon" className='w-6'/>

          <div className="text-h5 font-heading text-primaryBlue">EvalueX</div>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
