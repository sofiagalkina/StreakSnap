import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

/*
Sofia's trst code to see if the error goes away:

*/


export default function StreakCard({ streak }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedCount, setUpdatedCount] = useState(streak.count);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const lastUpdated = new Date(streak.lastUpdated);
    console.log("Last updated:", lastUpdated);
    const today = new Date();
    
    // If the last updated date is today, keep the checkbox checked and disabled
    if (lastUpdated.toDateString() === today.toDateString()) {
      setIsChecked(true);
      setIsDisabled(true);
    } else {
      setIsChecked(false);
      setIsDisabled(false);
    }
  }, [streak.lastUpdated]);

  const handleClick = () => {
    console.log("Streak clicked:", streak.id);
    console.log("Streak name:", streak.title);
    router.push(`/streaks/${streak.id}`);
  };

  const handleCheckboxClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the card's onClick handler
    if (streak.streakType === 'SIMPLE') {
      // Update simple streak directly without opening modal
      const res = await fetch('/api/streaks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: streak.id }), // No need for newCount in simple streaks
      });

      if (res.ok) {
        setIsChecked(true);
        setIsDisabled(true);
        window.location.reload(); // Refresh the entire page after the streak is recorded
      } else {
        console.error('Failed to update simple streak');
      }

    } else if (streak.streakType === 'COUNT') {
      // Open modal for updating count streaks
      if (!isDisabled) {
        setIsModalOpen(true); 
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateData = {
      id: streak.id,
      newCount: updatedCount, 
    };
  
    const res = await fetch('/api/streaks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
  
    if (res.ok) {
      setIsChecked(true);
      setIsDisabled(true);
      console.log('Streak updated successfully');
      handleModalClose();
      window.location.reload(); // Refresh the entire page after the streak is recorded
    } else {
      console.error('Failed to update streak');
    }
  };

  return (
    <>
      {/* Streak Card */}
      <div className="bg-[#EFEFEF] rounded-lg p-6 shadow-md flex justify-between items-center" onClick={handleClick}>
        <input type="checkbox" className="w-8 h-8" onClick={handleCheckboxClick} checked={isChecked} disabled={isDisabled}/>
        <div className="text-center">
          <h3 className="text-xl">{streak.title}</h3>
          {streak.streakType === 'COUNT' && (
            <p className="text-sm">
              Average: {streak.average.toFixed(2)} | Total: {streak.count.toFixed(0)} {streak.datatype}
            </p>
          )}
        </div>
        <div className="text-center">
          <span className="text-4xl font-bold">{streak.streakCount}</span>
        </div>
      </div>

      {/* Modal for Updating Count */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Update Count</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count">
                  New Count
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="count"
                  type="number"
                  value={updatedCount}
                  onChange={(e) => setUpdatedCount(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  type="button"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
