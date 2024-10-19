import { useRouter } from 'next/navigation';

export default function StreakCard({ streak }) {
    const router = useRouter();

    const handleClick = () => {
      console.log("Streak clicked:", streak.id);
      console.log("Streak name:", streak.title);
      router.push(`/streaks/${streak.id}`);
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };
  
    return (
      <div className="bg-[#EFEFEF] rounded-lg p-6 shadow-md flex justify-between items-center" onClick={handleClick}>
        <input type="checkbox" className="w-8 h-8" onClick={handleCheckboxClick}/>
        <div className="text-center">
          <h3 className="text-xl">{streak.title}</h3>
          {streak.streakType === 'COUNT' && (
          <p className="text-sm">
            Average: {streak.average} | Total: {streak.count} {streak.datatype}
          </p>
        )}        </div>
        <div className="text-center">
          <span className="text-4xl font-bold">{streak.streakCount}</span>
        </div>
      </div>
    );
  }
  