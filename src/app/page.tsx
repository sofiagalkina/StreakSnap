"use client";
import { useRouter } from 'next/navigation';
import StreakCard from "./components/streakCard";
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const router = useRouter();
  const { data, error } = useSWR('/api/streaks', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


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
        <div className="space-y-6">
          {data.map((result: any) => (
            <StreakCard key={result.id} streak={result} onClick={() => handleClick(result.id)} />
          ))}
        </div>
        {/* Add Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-[#f18701] text-[#FFFFFF] py-2 px-4 rounded-full">Add +</button>
        </div>
      </div>
    </div>
  );
}