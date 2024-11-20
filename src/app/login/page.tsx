"use client";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      const userData = await response.json();
      setUser(userData); 
      router.push(`task/${userData.id}`);
    } else {
      console.error('Login failed');
      setErrorMessage('Login Failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-80">
        <h1 className="text-4xl font-bold mb-4 text-black">Login</h1>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-black">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-black">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
        )}

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
