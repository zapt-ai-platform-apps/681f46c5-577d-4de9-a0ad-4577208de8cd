import React, { useState } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameStateProvider } from './context/GameStateContext';

export default function App() {
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [finalScore, setFinalScore] = useState(0);
  const [finalLength, setFinalLength] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  const startGame = () => {
    setGameState('playing');
  };

  const endGame = (score, length, time) => {
    setFinalScore(score);
    setFinalLength(length);
    setFinalTime(time);
    setGameState('gameOver');
  };

  const restartGame = () => {
    setGameState('playing');
  };

  return (
    <div className="h-full min-h-screen bg-gray-900 text-white overflow-hidden">
      <GameStateProvider>
        {gameState === 'start' && <StartScreen onStart={startGame} />}
        {gameState === 'playing' && <Game onGameOver={endGame} />}
        {gameState === 'gameOver' && (
          <GameOverScreen
            score={finalScore}
            length={finalLength}
            time={finalTime}
            onRestart={restartGame}
          />
        )}
      </GameStateProvider>
    </div>
  );
}