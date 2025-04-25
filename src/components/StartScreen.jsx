import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <h1 className="text-5xl font-bold mb-6 text-green-400">Maulana Worm.io</h1>
      
      <div className="max-w-md mb-8">
        <p className="mb-4">Control your worm, eat food, grow longer, and avoid other worms!</p>
        <p className="text-gray-300 text-sm mb-6">
          Use the analog stick to navigate and the booster button for a speed boost when needed.
        </p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8 max-w-md">
        <h2 className="text-xl font-bold text-yellow-300 mb-2">Game Rules:</h2>
        <ul className="text-left text-sm space-y-2">
          <li>• Collect food to grow longer</li>
          <li>• Use power-ups for special abilities</li>
          <li>• Avoid hitting other worms</li>
          <li>• Don't hit the map boundaries</li>
          <li>• Use your booster wisely - it's faster but riskier!</li>
        </ul>
      </div>
      
      <button 
        onClick={onStart}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-colors cursor-pointer"
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;