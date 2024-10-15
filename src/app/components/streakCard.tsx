import { useRouter } from 'next/navigation';

export default function StreakCard({ streak }) {
    const router = useRouter();

    const handleClick = () => {
      console.log("Streak clicked:", streak.id);
      console.log("Streak name:", streak.title);
      router.push(`/streaks/${streak.id}`);
    };
  
    return (
      <div
        className="bg-[#EFEFEF] rounded-lg p-6 shadow-md flex justify-between items-center"
        onClick={handleClick}
      >
        <input type="checkbox" className="w-8 h-8" />
        <div className="text-center">
          <h3 className="text-xl">{streak.title}</h3>
          <p className="text-sm">Average: {streak.average} | Total: {streak.total}</p>
        </div>
        <div className="text-center">
          <span className="text-4xl font-bold">{streak.count}</span>
        </div>
      </div>
    );
  }
  