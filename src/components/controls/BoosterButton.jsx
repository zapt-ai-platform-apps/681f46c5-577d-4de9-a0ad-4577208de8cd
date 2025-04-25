import React, { useState, useEffect } from 'react';
import { useGameState } from '../../context/GameStateContext';

const BoosterButton = () => {
  const { activateBooster, deactivateBooster } = useGameState();
  const [isPressed, setIsPressed] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [energy, setEnergy] = useState(100);
  
  // Handle booster activation
  useEffect(() => {
    if (isPressed && energy > 0 && cooldown === 0) {
      activateBooster();
      
      // Drain energy while booster is active
      const interval = setInterval(() => {
        setEnergy(prev => {
          const newEnergy = Math.max(0, prev - 2);
          if (newEnergy === 0) {
            setIsPressed(false);
            deactivateBooster();
            setCooldown(100); // Start cooldown when energy is depleted
          }
          return newEnergy;
        });
      }, 100);
      
      return () => {
        clearInterval(interval);
        deactivateBooster();
      };
    }
  }, [isPressed, energy, cooldown, activateBooster, deactivateBooster]);
  
  // Handle energy regeneration when booster is not active
  useEffect(() => {
    if (!isPressed && energy < 100) {
      const interval = setInterval(() => {
        setEnergy(prev => Math.min(100, prev + 0.5));
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isPressed, energy]);
  
  // Handle cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown(prev => Math.max(0, prev - 1));
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [cooldown]);
  
  const handlePress = () => {
    if (energy > 0 && cooldown === 0) {
      setIsPressed(true);
    }
  };
  
  const handleRelease = () => {
    setIsPressed(false);
  };
  
  // Calculate the fill colors based on energy and cooldown
  const getFillStyle = () => {
    if (cooldown > 0) {
      return { backgroundColor: `rgba(100, 100, 100, ${cooldown / 100})` };
    }
    
    const intensity = energy / 100;
    return {
      backgroundColor: isPressed 
        ? `rgba(255, 50, 50, ${intensity})` 
        : `rgba(255, 0, 0, ${intensity})`
    };
  };
  
  return (
    <div 
      className="booster-button cursor-pointer"
      style={getFillStyle()}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      <div className="flex flex-col items-center justify-center">
        {cooldown > 0 ? (
          <span className="text-xs">COOLING</span>
        ) : (
          <span className="text-lg">BOOST</span>
        )}
        <div className="w-full h-1 bg-gray-700 mt-1">
          <div 
            className="h-full bg-white" 
            style={{ width: `${energy}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BoosterButton;