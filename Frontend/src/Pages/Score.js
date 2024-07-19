import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ScorePage = () => {
  const location = useLocation();
  const { totalScore, maxScore } = location.state || { totalScore: 0, maxScore: 0 };

  return (
    <div>
        <div><Navbar></Navbar></div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Total Score: {totalScore} / {maxScore}</h3>
        </div>
      </div>
    </div>
    </div>

  );
};

export default ScorePage;
