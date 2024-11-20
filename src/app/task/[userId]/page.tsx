"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import StreakCard from "../../components/streakCard";
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const router = useRouter();
  const { data, error } = useSWR('/api/streaks', fetcher)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCountStreak, setIsCountStreak] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    streakType: 'COUNT',
    count: 0,
    datatype: 'REPS',
  });
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data);


  const handleClick = (streakId: number) => {
    router.push(`/streaks/${streakId}`);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStreakTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isCount = e.target.value === 'COUNT';
    setIsCountStreak(isCount);
    setFormData({
      ...formData,
      streakType: e.target.value,
      datatype: isCount ? 'REPS' : '', // Clear datatype if it's a simple streak
      count: isCount ? 0 : 0, // Reset count for simple streaks
    });
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const streakData = {
      ...formData,
      streakCount: 0,
      average: 0,
    };
    console.log(streakData);

    const res = await fetch('/api/streaks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(streakData),
    });
    if (res.ok) {
      // Successfully added streak, close modal and refresh data
      handleModalToggle();
      router.refresh(); // Refresh the page or data
    } else {
      // Handle error (e.g., show error message)
      console.error('Failed to add streak');
    }
  };

  
  return (
    <div className="min-h-screen bg-[#F7E9E4] flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#7b2cbf] text-[#FFFFFF] flex flex-col p-6">
        <h1 className="text-2xl mb-8">Hello, Josh!</h1>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="material-icons">search</span>
            <a href="#" className="ml-3">Search</a>
          </li>
          <li className="flex items-center">
            <span className="material-icons">event</span>
            <a href="#" className="ml-3">Today</a>
          </li>
          <li className="flex items-center">
            <span className="material-icons">calendar_today</span>
            <a href="#" className="ml-3">Upcoming</a>
          </li>
          <li className="flex items-center">
            <span className="material-icons">tune</span>
            <a href="#" className="ml-3">Filters & labels</a>
          </li>
        </ul>
 
        {/* Streaks Section */}
        <div className="mt-10">
          <h2 className="text-lg">My Streaks</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center">
              <span className="material-icons">tag</span>
              <a href="#" className="ml-3">Education 📚</a>
            </li>
            <li className="flex items-center">
              <span className="material-icons">tag</span>
              <a href="#" className="ml-3">Work 📈</a>
            </li>
            <li className="flex items-center">
              <span className="material-icons">tag</span>
              <a href="#" className="ml-3">Gym 💪</a>
            </li>
          </ul>
        </div>
      </div>
 
      {/* Main Content */}
      <div className="flex-1 p-6 text-[#171717] bg-white">
        <h2 className="text-2xl mb-8">View more information about the streak.</h2>
 
        {/* Streak Card */}
        <div className="space-y-6">
          {data.map((result: any) => (
            <StreakCard key={result.id} streak={result} onClick={() => handleClick(result.id)} />
          ))}
        </div>
        {/* Add Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-[#f18701] text-[#FFFFFF] py-2 px-4 rounded-full" onClick={handleModalToggle} >Add +</button>
        </div>
      </div>
       {/* Modal Overlay */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-[#000000] mb-4 ">Add New Streak</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter streak title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streakType">
                  Streak Type
                </label>
                <select
                  id="streakType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  value={formData.streakType}
                  onChange={handleStreakTypeChange}
                  required
                >
                  <option value="COUNT">Count Streak</option>
                  <option value="SIMPLE">Simple Streak</option>
                </select>
              </div>

              {isCountStreak && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  Type
                </label>
                <select
                  id="datatype"
                  name="datatype"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  value={formData.datatype}
                  onChange={handleInputChange}
                  disabled={!isCountStreak}
                  required={isCountStreak}
                >
                  <option value="REPS">REPS</option>
                  <option value="DISTANCE">DISTANCE</option>
                  <option value="WEIGHT">WEIGHT</option>
                  <option value="GALLONS">GALLONS</option>
                  <option value="SECONDS">SECONDS</option>
                  <option value="MINUTES">MINUTES</option>
                  <option value="HOURS">HOURS</option>
                  <option value="MILES">MILES</option>
                  <option value="KILOMETERS">KILOMETERS</option>
                  <option value="LITERS">LITERS</option>
                </select>
              </div>
              )}
              <div className="flex items-center justify-between">
                <button
                  className="bg-[#f18701] hover:bg-[#f18701] text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
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