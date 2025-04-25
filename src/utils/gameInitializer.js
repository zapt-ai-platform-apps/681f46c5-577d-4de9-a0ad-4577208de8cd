import { v4 as uuidv4 } from 'uuid';

// Generate random color
const getRandomColor = () => {
  const colors = [
    '#FF5733', '#33FF57', '#5733FF', '#FF33A8', 
    '#33A8FF', '#A8FF33', '#FFFF33', '#FF33FF',
    '#33FFFF', '#FFA833', '#A833FF', '#FF3333'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate AI worm with segments
const generateAIWorm = (worldSize) => {
  const x = Math.random() * worldSize;
  const y = Math.random() * worldSize;
  const length = 5 + Math.floor(Math.random() * 20); // Random length between 5-25
  const size = 6 + Math.floor(Math.random() * 10); // Random size between 6-16
  const color = getRandomColor();
  const id = uuidv4();
  
  // Generate segments for the worm
  const segments = [];
  const direction = Math.random() * Math.PI * 2; // Random direction
  for (let i = 0; i < length; i++) {
    segments.push({
      x: x - Math.cos(direction) * i * size,
      y: y - Math.sin(direction) * i * size
    });
  }
  
  return {
    id,
    segments,
    size,
    color,
    direction,
    speed: 0.5 + Math.random() * 1.5, // Random speed
    isBoosterActive: false,
    boosterEnergy: 100,
    targetDirection: direction,
    changeDirectionTime: Math.random() * 100, // Random initial time to change direction
    turnSpeed: 0.05 + Math.random() * 0.05, // How fast the worm can turn
    behavior: Math.floor(Math.random() * 3) // 0: wanderer, 1: predator, 2: avoider
  };
};

// Generate food item
const generateFood = (worldSize) => {
  return {
    x: Math.random() * worldSize,
    y: Math.random() * worldSize,
    size: 3 + Math.random() * 4, // Random size between 3-7
    color: getRandomColor(),
    value: Math.floor(Math.random() * 10) + 1 // Random value between 1-10
  };
};

// Generate power-up
const generatePowerUp = (worldSize) => {
  const powerUpColors = [
    '#FFFF00', // Yellow
    '#00FFFF', // Cyan
    '#FF00FF', // Magenta
    '#FF9900', // Orange
    '#00FF99', // Spring Green
    '#9900FF', // Violet
    '#FFFFFF'  // White
  ];
  
  return {
    x: Math.random() * worldSize,
    y: Math.random() * worldSize,
    type: Math.floor(Math.random() * 1000), // 1000 different types
    color: powerUpColors[Math.floor(Math.random() * powerUpColors.length)],
    duration: 5000 + Math.random() * 10000, // Duration between 5-15 seconds
    value: Math.floor(Math.random() * 10) + 1 // Power value between 1-10
  };
};

// Initialize game state
export const initializeGameState = (worldSize) => {
  // Generate AI worms
  const aiWorms = Array.from({ length: 200 }, () => generateAIWorm(worldSize));
  
  // Generate food particles (thousands)
  const foodItems = Array.from({ length: 2000 }, () => generateFood(worldSize));
  
  // Generate power-ups
  const powerUps = Array.from({ length: 100 }, () => generatePowerUp(worldSize));
  
  return {
    aiWorms,
    foodItems,
    powerUps,
    worldSize
  };
};