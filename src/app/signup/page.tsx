"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      // Handle user data
      router.push(`task/${userData.id}`);
    } else {
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-black">Sign Up</h1>
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
        <button type="submit" className="w-full py-2 bg-blue-600 text-black rounded hover:bg-blue-700">
          Sign Up
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;
