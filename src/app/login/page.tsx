"use client";
<<<<<<< HEAD
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
=======

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
>>>>>>> 7203e41 (added login functionality)

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
=======
  const { setUser } = useAuth();
>>>>>>> 7203e41 (added login functionality)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
<<<<<<< HEAD
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      // Store user data in context or local storage if needed
      router.push('/task');
    } else {
      setErrorMessage('Invalid email or password');
=======
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      const userData = await response.json();
      setUser(userData); // Set the user data in context
      // Redirect to the main page or a dashboard after login
      window.location.href = '/';
    } else {
      console.error('Login failed');
      // Handle login error (e.g., show an error message)
>>>>>>> 7203e41 (added login functionality)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
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
        <button type="submit" className="w-full py-2 bg-blue-600 text-black rounded hover:bg-blue-700">
          Login
        </button>
<<<<<<< HEAD
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
=======
>>>>>>> 7203e41 (added login functionality)
      </form>
    </div>
  );
};

export default LoginPage;
