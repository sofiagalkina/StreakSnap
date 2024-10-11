"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleClick = (streakId: number) => {
    
    router.push(`/streaks/${streakId}`);
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
        <div className="space-y-6" onClick={() => handleClick(1)}>
          <div className="bg-[#EFEFEF] rounded-lg p-6 shadow-md flex justify-between items-center">
            <input type="checkbox"  className="w-8 h-8" />
            <div className="text-center">
              <h3 className="text-xl">Streak Name</h3>
              <p className="text-sm">Average: 5.5 | Total: 100</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold">14</span>
            </div>
          </div>
 
          <div className="bg-[#EFEFEF] rounded-lg p-6 shadow-md flex justify-between items-center">
            <input type="checkbox" className="w-8 h-8" />
            <div className="text-center">
              <h3 className="text-xl">Streak Name</h3>
              <p className="text-sm">Average: 2.0 | Total: 12</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold">6</span>
            </div>
          </div>
        </div>
 
        {/* Add Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-[#f18701] text-[#FFFFFF] py-2 px-4 rounded-full">Add +</button>
        </div>
      </div>
    </div>
  );
}
 