import React from 'react';

const ScorePanel = ({ score, length, time, powerUp }) => {
  // Convert time (in seconds) to minutes and seconds format
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  
  return (
    <div className="absolute top-4 left-4 bg-black bg-opacity-50 p-3 rounded-lg text-white">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Score:</span>
          <span className="font-bold">{score}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Length:</span>
          <span className="font-bold">{length}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Time:</span>
          <span className="font-bold">{formattedTime}</span>
        </div>
        
        {powerUp && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-600">
            <span className="text-gray-300">Power-up:</span>
            <span className="font-bold text-yellow-300">{powerUp.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScorePanel;