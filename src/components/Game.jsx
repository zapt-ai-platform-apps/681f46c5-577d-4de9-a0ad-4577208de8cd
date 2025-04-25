import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { useGameState } from '../context/GameStateContext';
import AnalogControl from './controls/AnalogControl';
import BoosterButton from './controls/BoosterButton';
import MiniMap from './ui/MiniMap';
import ScorePanel from './ui/ScorePanel';
import PlayerWorm from './entities/PlayerWorm';
import AIWorms from './entities/AIWorms';
import FoodLayer from './entities/FoodLayer';
import PowerUpLayer from './entities/PowerUpLayer';
import WorldBoundary from './entities/WorldBoundary';
import { initializeGameState } from '../utils/gameInitializer';
import { useWindowSize } from '../hooks/useWindowSize';
import { useGameLoop } from '../hooks/useGameLoop';

const WORLD_SIZE = 5000; // Size of the game world (5000x5000)

const Game = ({ onGameOver }) => {
  const stageRef = useRef(null);
  const windowSize = useWindowSize();
  const [gameStartTime] = useState(Date.now());
  
  const {
    score,
    length,
    timeAlive,
    isBoosterActive, 
    currentPowerUp,
    updateScore,
    updateLength,
    updateTimeAlive
  } = useGameState();

  // Player state
  const [playerPosition, setPlayerPosition] = useState({ x: WORLD_SIZE / 2, y: WORLD_SIZE / 2 });
  const [playerVelocity, setPlayerVelocity] = useState({ x: 0, y: 0 });
  const [cameraPosition, setCameraPosition] = useState({ x: WORLD_SIZE / 2, y: WORLD_SIZE / 2 });
  const [playerSegments, setPlayerSegments] = useState([]);
  
  // Game elements state 
  const [gameState, setGameState] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize game state
  useEffect(() => {
    const initialState = initializeGameState(WORLD_SIZE);
    setGameState(initialState);
    
    // Start with 5 segments
    const initialSegments = [];
    for (let i = 0; i < 5; i++) {
      initialSegments.push({
        x: WORLD_SIZE / 2 - i * 20,
        y: WORLD_SIZE / 2
      });
    }
    setPlayerSegments(initialSegments);
  }, []);

  // Update time alive every second
  useEffect(() => {
    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - gameStartTime) / 1000);
      updateTimeAlive(seconds);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStartTime, updateTimeAlive]);

  // Handle game over
  useEffect(() => {
    if (isGameOver) {
      onGameOver(score, length, timeAlive);
    }
  }, [isGameOver, onGameOver, score, length, timeAlive]);

  // Handle player movement based on analog control
  const handlePlayerMovement = (direction) => {
    setPlayerVelocity(direction);
  };

  // Game loop hook to update all game entities
  useGameLoop(() => {
    if (!gameState || isGameOver) return;

    // Update player position based on velocity and booster
    const speed = isBoosterActive ? 8 : 4; // Doubled the speed (2x faster)
    const newX = playerPosition.x + playerVelocity.x * speed;
    const newY = playerPosition.y + playerVelocity.y * speed;
    
    // Boundary check
    if (newX < 0 || newX > WORLD_SIZE || newY < 0 || newY > WORLD_SIZE) {
      setIsGameOver(true);
      return;
    }
    
    // Update player position
    setPlayerPosition({ x: newX, y: newY });
    
    // Update player segments (follow the leader)
    const newSegments = [...playerSegments];
    newSegments.unshift({ x: newX, y: newY });
    newSegments.pop();
    setPlayerSegments(newSegments);
    
    // Update camera to follow player
    setCameraPosition({ x: newX, y: newY });
    
    // Update AI worms movement
    if (gameState.aiWorms && gameState.aiWorms.length > 0) {
      gameState.aiWorms.forEach(worm => {
        // Randomly change direction occasionally
        if (Math.random() < 0.02) {
          worm.targetDirection = Math.random() * Math.PI * 2;
        }
        
        // Smoothly transition to target direction
        const directionDiff = Math.atan2(
          Math.sin(worm.targetDirection - worm.direction),
          Math.cos(worm.targetDirection - worm.direction)
        );
        worm.direction += directionDiff * worm.turnSpeed;
        
        // Avoid world boundaries
        const headX = worm.segments[0].x;
        const headY = worm.segments[0].y;
        
        const boundaryMargin = 200;
        if (headX < boundaryMargin || headX > WORLD_SIZE - boundaryMargin ||
            headY < boundaryMargin || headY > WORLD_SIZE - boundaryMargin) {
          // Steer away from boundaries
          const centerX = WORLD_SIZE / 2;
          const centerY = WORLD_SIZE / 2;
          worm.targetDirection = Math.atan2(centerY - headY, centerX - headX);
        }
        
        // Update worm position based on direction and speed
        const wormSpeed = worm.isBoosterActive ? worm.speed * 1.5 : worm.speed;
        const moveX = Math.cos(worm.direction) * wormSpeed;
        const moveY = Math.sin(worm.direction) * wormSpeed;
        
        // Move head
        const newHeadX = headX + moveX;
        const newHeadY = headY + moveY;
        
        // Update segments (follow the leader)
        worm.segments.unshift({ x: newHeadX, y: newHeadY });
        worm.segments.pop();
        
        // Randomly activate booster
        if (Math.random() < 0.005 && worm.boosterEnergy > 50) {
          worm.isBoosterActive = true;
        } else if (worm.isBoosterActive) {
          worm.boosterEnergy -= 1;
          if (worm.boosterEnergy <= 0) {
            worm.isBoosterActive = false;
          }
        } else if (worm.boosterEnergy < 100) {
          worm.boosterEnergy += 0.2;
        }
      });
    }
    
    // Check collisions with food
    if (gameState) {
      const { foodItems, aiWorms, powerUps } = gameState;
      
      // Check food collisions
      for (let i = 0; i < foodItems.length; i++) {
        const food = foodItems[i];
        const distance = Math.sqrt(
          Math.pow(newX - food.x, 2) + Math.pow(newY - food.y, 2)
        );
        
        if (distance < 20) {
          // Add segment
          newSegments.push({ ...newSegments[newSegments.length - 1] });
          setPlayerSegments(newSegments);
          
          // Update food
          foodItems[i] = {
            ...food,
            x: Math.random() * WORLD_SIZE,
            y: Math.random() * WORLD_SIZE
          };
          
          // Update score and length
          updateScore(score + food.value);
          updateLength(newSegments.length);
        }
      }
      
      // Check collisions with AI worms
      for (const aiWorm of aiWorms) {
        for (const segment of aiWorm.segments) {
          const distance = Math.sqrt(
            Math.pow(newX - segment.x, 2) + Math.pow(newY - segment.y, 2)
          );
          
          if (distance < 15) {
            setIsGameOver(true);
            return;
          }
        }
      }
      
      // Check for power-up collisions
      for (let i = 0; i < powerUps.length; i++) {
        const powerUp = powerUps[i];
        const distance = Math.sqrt(
          Math.pow(newX - powerUp.x, 2) + Math.pow(newY - powerUp.y, 2)
        );
        
        if (distance < 20) {
          // Apply power-up effect
          gameState.powerUps[i] = {
            ...powerUp,
            x: Math.random() * WORLD_SIZE,
            y: Math.random() * WORLD_SIZE,
            type: Math.floor(Math.random() * 1000)
          };
        }
      }
    }
  });

  if (!gameState) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative w-full h-full">
      <Stage
        ref={stageRef}
        width={windowSize.width}
        height={windowSize.height}
        offsetX={cameraPosition.x - windowSize.width / 2}
        offsetY={cameraPosition.y - windowSize.height / 2}
      >
        <Layer>
          <WorldBoundary worldSize={WORLD_SIZE} />
          <FoodLayer foodItems={gameState.foodItems} />
          <PowerUpLayer powerUps={gameState.powerUps} />
          <AIWorms aiWorms={gameState.aiWorms} />
          <PlayerWorm segments={playerSegments} isBoosterActive={isBoosterActive} />
        </Layer>
      </Stage>
      
      <ScorePanel score={score} length={length} time={timeAlive} powerUp={currentPowerUp} />
      <MiniMap 
        worldSize={WORLD_SIZE} 
        playerPosition={playerPosition}
        aiPositions={gameState.aiWorms.map(worm => worm.segments[0])}
      />
      <AnalogControl onDirectionChange={handlePlayerMovement} />
      <BoosterButton />
    </div>
  );
};

export default Game;