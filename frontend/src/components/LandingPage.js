// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import heroImg from '../assets/heroImage.png';
import bgImg from '../assets/bg-hero.png';

const LandingPage = () => {
  return (
    <div className=' overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${bgImg})` }}>
      <Navbar />
      <div className="flex items-center justify-center p-16">
        <div className='flex items-center justify-center gap-12'>
          <div className='flex flex-col items-center justify-center w-1/2'>
            <h4 className="text-h4 text-primaryBlue/50 font-heading">Unlocking Knowledge with Precision </h4>
            <h2 className="text-h2 text-center text-primaryBlue mb-2 font-heading">
              Elevate Learning Experiences with EvalueX.
            </h2>
            <Link to="/login">
              <button className="px-6 py-2 bg-primaryBlue text-h4 text-neutral rounded-lg hover:underline">
                Get Started
              </button>
            </Link>
          </div>

          <div className='w-1/2'>
            <img src={heroImg} alt="Evalux Icon" className='h-3/4' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
