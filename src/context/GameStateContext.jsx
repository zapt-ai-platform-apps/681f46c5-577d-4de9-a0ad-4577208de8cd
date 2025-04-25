import React, { createContext, useState, useContext } from 'react';

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [length, setLength] = useState(5);
  const [timeAlive, setTimeAlive] = useState(0);
  const [isBoosterActive, setIsBoosterActive] = useState(false);
  const [currentPowerUp, setCurrentPowerUp] = useState(null);
  
  const updateScore = (newScore) => {
    setScore(newScore);
  };
  
  const updateLength = (newLength) => {
    setLength(newLength);
  };
  
  const updateTimeAlive = (newTime) => {
    setTimeAlive(newTime);
  };
  
  const activateBooster = () => {
    setIsBoosterActive(true);
  };
  
  const deactivateBooster = () => {
    setIsBoosterActive(false);
  };
  
  const setPowerUp = (powerUp) => {
    setCurrentPowerUp(powerUp);
  };
  
  const clearPowerUp = () => {
    setCurrentPowerUp(null);
  };
  
  return (
    <GameStateContext.Provider value={{
      score,
      length,
      timeAlive,
      isBoosterActive,
      currentPowerUp,
      updateScore,
      updateLength,
      updateTimeAlive,
      activateBooster,
      deactivateBooster,
      setPowerUp,
      clearPowerUp
    }}>
      {children}
    </GameStateContext.Provider>
  );
};