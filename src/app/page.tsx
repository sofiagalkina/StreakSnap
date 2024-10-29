// src/app/page.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import Particle from '../components/Particle';

const MainMenu: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100" style={{ userSelect: 'none'}}>
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particle />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome Streak Snap!</h1>
        
        <Link href="/task">
          <button className="px-6 py-3 text-lg bg-[#7b2cbf] text-white rounded hover:bg-blue-600 focus:outline-none">
            Go to Streaks
          </button>
        </Link>
       </div>
      </div>
  );
};

export default MainMenu;