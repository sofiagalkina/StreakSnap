"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Streak {
  id: number;
  title: string;
  count: number;
  average: number;
  streakType: string;
  datatype: string;
  streakCount?: number;
}

type StreakStatistics = {
  totalStreak: number;
  totalCount: number;
  totalAverage: number;
  highestStreak: number;
  highestCount: number;
  highestAverage: number;
};

export default function StreakDetails() {
  const params = useParams();
  const { id } = params as { id: string };
  const [streak, setStreak] = useState<Streak | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [streakCount, setStreakCount] = useState<number | null>(null);
  const [count, setCount] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);
  const [showResetMessage, setShowResetMessage] = useState<boolean>(false);
  const [showResetCountMessage, setShowResetCountMessage] = useState<boolean>(false);
  const [streakStats, setStreakStats] = useState<StreakStatistics | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
      const fetchStreakStats = async () => {
          try {
              const response = await fetch(`/api/streakStats?streakId=${id}`);
              const data = await response.json();
              setStreakStats(data[0]);
              console.log('Streak statistics:', data);
          } catch (error) {
              console.error('Error fetching streak statistics:', error);
          }
      };

      fetchStreakStats();
  }, []);

  useEffect(() => {
    if (id) {
        fetch(`/api/streaks?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setStreak(data);
                    setTitle(data.title);
                }
            })
            .catch((error) => setError('Error fetching streak'));
    }
}, [id]);


const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
      const response = await fetch(`/api/streaks?id=${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            streakCount: streakCount ?? count,
            count: streak?.datatype === 'count' ? count : count,
            average: count === 0 ? 0 : average 
        }),      });
      const updatedStreak = await response.json();
      setStreak(updatedStreak);
  } catch {
      setError('Error updating streak');
  }
};

const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!id) {
    console.error('ID is required to delete a streak.');
    return;
  }

  console.log(`Deleting streak with ID: ${id}`);

  const res = await fetch(`/api/streaks?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    // Successfully deleted streak, close modal and refresh data
    handleModalToggle();
    router.push(`/task`);

  } else {
    // Handle error (e.g., show error message)
    console.error('Failed to delete streak');
  }
};

const handleModalToggle = () => {
  setIsModalOpen(!isModalOpen);
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700 font-semibold">
    <div className="w-3/4 h-3/4 max-w-xl mx-auto mt-4 bg-white p-8 rounded-lg shadow-lg">
    {streakStats ? (
        <>
            <h3>Streak Statistics</h3>
            <p>Total Streak Count: {streakStats.totalStreak}</p>
            {streak?.streakType === 'COUNT' && (
              <section>
              <p>Total Count: {streakStats.totalCount.toFixed(2)}</p>
              <p>Total Average: {streakStats.totalAverage.toFixed(2)}</p>
              </section>
            )}
            <p>Highest Streak Count: {streakStats.highestStreak}</p>
            {streak?.streakType === 'COUNT' && (
              <section>
              <p>Highest Count: {streakStats.highestCount.toFixed(2)}</p>
              <p>Highest Average: {streakStats.highestAverage.toFixed(2)}</p>
              </section>
            )}
        </>
    ) : (
        <p>Loading statistics...</p>
    )}
    </div>
    <div className='w-3/4 h-3/4 max-w-xl mt-4 p-8 mx-auto bg-white rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto mt-4">
        <h1 className="text-2xl font-bold text-purple-600 mb-6">Edit Streak</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none" 
          />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
              Streak Count:
              <input 
                  type="number" 
                  value={streak?.streakCount} 
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none" 
              />
          </label>
          <button type="button" 
            onClick={() => {setStreakCount(0); setAverage(0); setShowResetMessage(true);}}
            className="ml-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition">
              Reset Count
        </button><br/>
        {showResetMessage && (
            <span className="ml-4 text-sm text-gray-500">
              This will become 0 when "Save Changes" is clicked
            </span>
          )}
      </div>
        {streak?.streakType === 'COUNT' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Count:
              <input
                type="number"
                value={streak?.count.toFixed(2)}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </label>
            <label className="block text-gray-700 font-semibold mb-2">Average:
              <input
                type="number"
                value={streak?.average.toFixed(2)}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </label>
              <button
                type="button"
                onClick={() => {setCount(0); setShowResetCountMessage(true);}}
                className="ml-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
              >
                Reset Count
              </button><br/>
              {showResetCountMessage && (
                <span className="ml-4 text-sm text-gray-500">
                  Both count and average will become 0 when "Save Changes" is clicked
                </span>
              )}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Datatype:</label>
          <p className="p-2 border rounded-md bg-gray-100 text-gray-700">{streak?.datatype}</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#f18701] hover:bg-[#f18701] text-white font-bold py-2 px-4 rounded"
            >
            Save Changes
          </button>
        </div>

        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </form>
      <div className="flex justify-center items-center mt-6">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5"
          onClick={handleModalToggle}
        >
          Delete Streak
        </button>
      </div>
    </div>
    {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl text-[#000000] mb-4 ">Delete Streak</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <p>Are you sure you want to delete this streak?</p><br/>
          <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFormSubmit}
            >
              DELETE
            </button><br/><br/>
            <button
              className="text-red-500 hover:text-red-700 text-center"
              type="button"
              onClick={handleModalToggle}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    )}
    </div>
  );
}