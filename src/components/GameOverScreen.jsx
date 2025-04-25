import React from 'react';

const GameOverScreen = ({ score, length, time, onRestart }) => {
  // Convert time (in seconds) to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedTime = `${minutes}m ${seconds}s`;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <h1 className="text-5xl font-bold mb-6 text-red-500">Game Over</h1>
      
      <div className="bg-gray-800 p-8 rounded-lg mb-8 max-w-md">
        <h2 className="text-2xl font-bold text-yellow-300 mb-6">Your Results</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center pb-2 border-b border-gray-700">
            <span className="text-gray-300">Score:</span>
            <span className="text-2xl font-bold">{score}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-gray-700">
            <span className="text-gray-300">Length:</span>
            <span className="text-2xl font-bold">{length} units</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-gray-700">
            <span className="text-gray-300">Survival Time:</span>
            <span className="text-2xl font-bold">{formattedTime}</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onRestart}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-colors mb-4 cursor-pointer"
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameOverScreen;