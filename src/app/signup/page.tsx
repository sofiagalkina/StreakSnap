"use client";
import React from 'react';
import { prisma } from '@/../lib/prisma'
import bcrypt from 'bcryptjs'; 


const SignUpPage: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast the target to HTMLFormElement to access elements
    const target = e.target as HTMLFormElement;
    const email = target.elements.namedItem('email') as HTMLInputElement;
    const password = target.elements.namedItem('password') as HTMLInputElement;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password.value, 10);

    // Create the user in your database
    await prisma.user.create({
      data: {
        email: email.value,
        password: hashedPassword,
      },
    });

    // Handle post-signup logic (e.g., redirect or display success message)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign Up</h1>
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          placeholder="******************"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Sign Up
      </button>
    </form>
  </div>
  );
};

export default SignUpPage;
