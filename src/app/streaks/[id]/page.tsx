"use client";

import { useParams } from 'next/navigation';

export default function StreakDetails() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#F7E9E4] p-6 text-zinc-950">
      <h1 className="text-3xl mb-4">Streak Details for ID: {id}</h1>
      <p>Here you can display more details about the streak with ID: {id}.</p>
    </div>
  );
}