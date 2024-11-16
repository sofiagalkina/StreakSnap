"use client";
import React from 'react';
import Link from 'next/link';
import Particle from '../components/Particle';
import { useAuth } from '../context/AuthContext'; // Import your context

const MainMenu: React.FC = () => {
  const { user } = useAuth(); // Get user info from context

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100" style={{ userSelect: 'none' }}>
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particle />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome Streak Snap!</h1>
        
        {user ? (
          <Link href="/task">
            <button className="px-6 py-3 text-lg bg-[#7b2cbf] text-white rounded hover:bg-blue-600 focus:outline-none">
              Go to Streaks
            </button>
          </Link>
        ) : (
          <div>
            <Link href="/login">
              <button className="px-6 py-3 text-lg bg-[#7b2cbf] text-white rounded hover:bg-blue-600 focus:outline-none">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-3 text-lg bg-[#7b2cbf] text-white rounded hover:bg-blue-600 focus:outline-none ml-4">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainMenu;
